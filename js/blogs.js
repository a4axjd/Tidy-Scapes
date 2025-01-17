// Sample blog data
const blogs = [
  {
    id: 1,
    title: "ALOE VERA",
    date: "27-09-2024",
    author: "John Doe",
    author_designation: "Botanist",
    author_description: "John is a passionate botanist with years of experience in plant care.",
    author_image: "assets/images/blog/author-thumb-4.jpg",
    image1: "assets/images/products/plants/pr-1.jpg",
    description1: "Aloe vera is a succulent plant species of the genus Aloe...",
    description2: "An evergreen perennial, it originates from the Arabian Peninsula...",
  },
  // Add more blogs as needed
];

// Function to extract query parameters
function getQueryParams() {
  const params = {};
  const queryString = window.location.search.slice(1);
  queryString.split("&").forEach((param) => {
    const [key, value] = param.split("=");
    params[key] = decodeURIComponent(value);
  });
  return params;
}

// Render the blog content
function renderBlog() {
  const params = getQueryParams();
  const blogId = parseInt(params.id, 10); // Get blog ID from URL
  const blog = blogs.find((b) => b.id === blogId); // Find blog by ID

  if (!blog) {
    document.body.innerHTML = "<h1>Blog not found</h1>";
    return;
  }

  // Populate blog content
  document.getElementById("blog-title").innerText = blog.title;
  document.getElementById("blog-date").innerText = blog.date;
  document.getElementById("author-name").innerText = blog.author;
  document.getElementById("author-designation").innerText = blog.author_designation;
  document.getElementById("author-description").innerText = blog.author_description;
  document.getElementById("author-image").src = blog.author_image;
  document.getElementById("blog-image").src = blog.image1;
  document.getElementById("description1").innerText = blog.description1;
  document.getElementById("description2").innerText = blog.description2;
}

// Call the function on page load
window.onload = renderBlog;
