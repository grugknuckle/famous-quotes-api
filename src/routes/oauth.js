const router = require('express').Router()
const { requiresAuth } = require('express-openid-connect')

module.exports = router

router.route('/profile')
  .get((req, res) => {
    /*
    {
      "given_name": "Grugknuckle",
      "nickname": "aaron.wolbach",
      "name": "Grugknuckle",
      "picture": "https://lh3.googleusercontent.com/a-/AOh14Gi6st5CMrFLeOP0PbPzlB6lIG7MX_PcIY9JOsVpTQ=s96-c",
      "locale": "en",
      "updated_at": "2021-05-28T19:22:43.612Z",
      "email": "aaron.wolbach@gmail.com",
      "email_verified": true,
      "sub": "google-oauth2|117305745212471508481"
    }
    */
    res.json(req.oidc.user)
  })

router.route('/userinfo')
  .get(async (req, res) => {
    const userinfo = await req.oidc.fetchUserInfo()
    res.json(userinfo)
  })