## DevTinder Api's

# AuthRouter
- Post - /auth/signup
- Post - /auth/login
- Post - /auth/logout

# ProfileRouter
- Get - /profile/view
- Patch - /profile/edit
- Patch - /profile/password

# ConnectionRequestRouter
- Post - /request/send/interested/:userId
- Post - /request/send/ignored/:userId
- Post - /request/review/accepted/:requestId
- Post - /request/review/rejected/:requestId

# UserRouter
- Get /user/feed
- Get /user/connection
- get /user/requests