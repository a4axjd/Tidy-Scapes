import {config} from 'dotenv';
config();

import {dev} from 'genkit';

// Import your flows here.
import './flows/visualize-landscaping-ideas';

dev();
