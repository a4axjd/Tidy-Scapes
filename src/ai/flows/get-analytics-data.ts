'use server';
/**
 * @fileOverview Defines a Genkit flow for fetching and processing Google Analytics data.
 *
 * - getAnalyticsData - Fetches key metrics from the Google Analytics Data API.
 * - AnalyticsData - The return type for the getAnalyticsData function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

const AnalyticsDataSchema = z.object({
  totalUsers: z.number().describe('The total number of unique users in the last 30 days.'),
  screenPageViews: z.number().describe('The total number of page views in the last 30 days.'),
  topPages: z.array(z.object({
    page: z.string().describe('The path of the page.'),
    views: z.number().describe('The number of views for that page.'),
  })).describe('A list of the top 5 most viewed pages.'),
  trafficSources: z.array(z.object({
    source: z.string().describe('The source of the traffic (e.g., Google, Direct).'),
    users: z.number().describe('The number of users from that source.'),
  })).describe('A list of top traffic sources.'),
  audienceByCountry: z.array(z.object({
      country: z.string().describe('The country of the users.'),
      users: z.number().describe('The number of users from that country.'),
  })).describe('A list of users by country.')
});

export type AnalyticsData = z.infer<typeof AnalyticsDataSchema>;

export async function getAnalyticsData(): Promise<AnalyticsData> {
  return getAnalyticsDataFlow();
}

const getAnalyticsDataFlow = ai.defineFlow(
  {
    name: 'getAnalyticsDataFlow',
    outputSchema: AnalyticsDataSchema,
  },
  async () => {
    const propertyId = process.env.GA_PROPERTY_ID;
    const clientEmail = process.env.GA_CLIENT_EMAIL;
    const privateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!propertyId || !clientEmail || !privateKey) {
        throw new Error("Google Analytics environment variables are not set. Please check GA_PROPERTY_ID, GA_CLIENT_EMAIL, and GA_PRIVATE_KEY.");
    }
    
    const auth = new GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const analyticsData = google.analyticsdata({
      version: 'v1beta',
      auth,
    });

    const commonRequest = {
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
    };

    try {
        const [
            totalUsersResponse,
            pageViewsResponse,
            topPagesResponse,
            trafficSourceResponse,
            audienceResponse
        ] = await Promise.all([
            // Total Users
            analyticsData.properties.runReport({ ...commonRequest, metrics: [{ name: 'totalUsers' }] }),
            // Page Views
            analyticsData.properties.runReport({ ...commonRequest, metrics: [{ name: 'screenPageViews' }] }),
            // Top Pages
            analyticsData.properties.runReport({
                ...commonRequest,
                dimensions: [{ name: 'pagePath' }],
                metrics: [{ name: 'screenPageViews' }],
                orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
                limit: 5,
            }),
            // Traffic Sources
            analyticsData.properties.runReport({
                ...commonRequest,
                dimensions: [{ name: 'sessionSource' }],
                metrics: [{ name: 'totalUsers' }],
                orderBys: [{ metric: { metricName: 'totalUsers' }, desc: true }],
                limit: 5,
            }),
            // Audience by Country
            analyticsData.properties.runReport({
                ...commonRequest,
                dimensions: [{ name: 'country' }],
                metrics: [{ name: 'totalUsers' }],
                orderBys: [{ metric: { metricName: 'totalUsers' }, desc: true }],
                limit: 5,
            }),
        ]);

        const totalUsers = parseInt(totalUsersResponse.data.rows?.[0]?.metricValues?.[0]?.value || '0');
        const screenPageViews = parseInt(pageViewsResponse.data.rows?.[0]?.metricValues?.[0]?.value || '0');
        
        const topPages = topPagesResponse.data.rows?.map(row => ({
            page: row.dimensionValues?.[0]?.value || 'N/A',
            views: parseInt(row.metricValues?.[0]?.value || '0'),
        })) || [];
        
        const trafficSources = trafficSourceResponse.data.rows?.map(row => ({
            source: row.dimensionValues?.[0]?.value || 'N/A',
            users: parseInt(row.metricValues?.[0]?.value || '0'),
        })) || [];

        const audienceByCountry = audienceResponse.data.rows?.map(row => ({
            country: row.dimensionValues?.[0]?.value || 'N/A',
            users: parseInt(row.metricValues?.[0]?.value || '0'),
        })) || [];

        return {
            totalUsers,
            screenPageViews,
            topPages,
            trafficSources,
            audienceByCountry,
        };
    } catch(e: any) {
        console.error("Error fetching from Google Analytics API:", e.message);
        throw new Error("Failed to fetch analytics data from Google. Check API permissions and configuration.");
    }
  }
);
