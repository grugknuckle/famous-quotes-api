const environ = require('./set-environment')()

const ManagementClient = require('auth0').ManagementClient;

const management = new ManagementClient({
  domain: process.env.AUTH0_ISSUER_BASE_URL, // '{YOUR_ACCOUNT}.auth0.com'
  clientId: process.env.AUTH0_API_CLIENTID,  // <your-auth0-management-api-id>
  clientSecret: process.env.AUTH0_API_SECRET, // <your-auth0-management-api-non-interactive-secret>
  audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
  scope: 'read:users update:users'
})

const template = `
<!DOCTYPE html>
<html>
  <!--
    Liquid Syntax
    https://shopify.github.io/liquid/basics/introduction/
  -->
  <head>
    {%- auth0:head -%}
    <style>
      @media (min-aspect-ratio: 16/9) {
        .video-container iframe {
          /* height = 100 * (9 / 16) = 56.25 */
          height: 56.25vw;
        }
      }
          
      @media (max-aspect-ratio: 16/9) {
        .video-container iframe {
          /* width = 100 / (9 / 16) = 177.777777 */
          width: 177.78vh;
        }
      }

      .video-container{
        object-fit: cover;
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: black;
      }
          
      iframe {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100vw;
        height: 100vh;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body class="_widget-auto-layout">
    <div class="video-container">
      <iframe src="https://www.youtube.com/embed/rpWrtXyEAN0?start=0controls=0&autoplay=1&mute=1&playlist=rpWrtXyEAN0&loop=1"></iframe>
    </div>
    {%- auth0:widget -%}
  </body>
</html>
`


management.setBrandingUniversalLoginTemplate({ template: template }, function (err, template) {
  if (err) {
    // Handle error.
  }
});