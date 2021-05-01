/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …
responseCodes : {
            badRequest: 400,
            serverError: 500,
            forbidden: 403,
            notFound: 404,
            validationError: 422,
            notAuthenticate: 401,
            success: 200,
            create: 201,
  },
  userRoles: {
    normalUser: "NORMAL_USER",
    adminUser: "ADMIN_USER",
    guestUser:"GUEST_USER"
  },
  firebase_config: {
  "url":"https://lean-node-task-266b7.firebaseio.com",
  "type": "service_account",
  "project_id": "lean-node-task-266b7",
  "private_key_id": "16af6cad980141d1e7abf28a1b9762bcab5dcc69",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDJCpOPcWtwAwSw\nJzrl8BNggdOVj6IwtRMrrGnxnMvbSPfx+RpRc9U8giscgH8YGAoA+8EenFrEmsx4\ntzlWO8EM1oAn0WHMvGXqT9IqcEBMoR2vhZp74auaX2whL+WhSULtzirTiag4QNMZ\nBHeKho28V9dKDnE3J7uWgTDQZisoo0+K54ULKKZunmSqUtDdCMn1gIeZxg9F4+8A\n0yGr3IMuj0m44X6cTKXDA95zE5ZupAP0I+QDk5/T3kFKl+/tgQrLpegThFc3alyJ\nN34H3zRmpeU4mmhla7vyyh2DNu/1e2DppbvCSKej5d0XIf3aMjf+ieH1grfU0EG4\ndKqGuB+LAgMBAAECggEAC+iOeQ602Hu1SWHpgTlJTIwkJlXNu6jeK9YYqHErOiAG\nX9TrlCuSU/U57IRIAvtZjFldRRzp23934SapRMxhUQtbqAAlFOWL++cigdUIWgGp\nKn51eiUR7yD73LNjnLwkNMXjj4g16K8eUfsLwa7asm9Zl09nsWavG+knJREIOW3o\nJYs67s921cPqCBdwatB0TVzhRjye0iKnUe9+B8mJRWPwDhzO+NUVjn07h+OU2rp6\n2DpeLqrGWcEB8ByCjy89zZSbYFkymhCReFaOfgnR0qvSsQdTDZez6+EXgRBldGpy\nTP9pzjdX+2PrrnHtMfDLSYvnIPKtGk0/caQxiFrzEQKBgQDlZfyIwhQ5xN/QwDPl\nq7NFCNCe63Jtfeug8a3q3jEy4Ga011MREsnlfOBA+XR8s+7srv6VDA/N9514iRvb\nRZJ8OT7atlFGFpcGvJ1l4laGeW7CV6nRHBmpzXQ6rrtdaP9IULZLzgfA7jK248y7\nfwRyEbC7Oh2Xt8AHY7OKg5RQ/QKBgQDgWsU7uOWgakFtRSkKbyIj3XEWPdSu6513\n1GaAk+37CvJHdTeSfYFGTZrX1Cg3x600opOKxup+3b8GJKMTfTZfTQA/Bh0cQXUQ\nXWqPEqcnwubbVnQUp3DVXysxsL8yvhUKyRgje12j7LRlv21JfK4FmyEef6lPRBR3\nEvb9rzm9JwKBgEGvuGY4nK4GD8iooLOtPMIRyhsXdEah/eyyB4jvYsscsowp9CE5\nbhKGdXhlddOXelzPpxpqv8PMmYzARfe9rjpf8f2SoyccpNZLAA8ChqAu+WYwz/GO\nyFJ1AEkla4VN4XuFkQ2Xy2SVUHRKOn+d2VoIcsDJ3VtqRFRZWjnZf4jJAoGABFne\nT10zntvQrwTTWe9z0ww9YDgMwuOw5x0Ia9/ykpbQwhAE5uNmOW3R3fOwX/yQYF/y\nypM3AwTb6ouVWhBomIqOwaolsGGYmpulMGclNMEz5vcTQz9IEetJlCogWySSleX2\ngOGonEA/82U2AmHXoiYzCztgljf0yaZlgd//F6sCgYEAxnB6r1Ms1JYX1MZUOdH0\nMBD5qdEbCKmOcRDMaFYBa53JUmF27KQyqO664gHOT17dM82rFrjpp48dRtfNswHJ\n4sEyGcBdUcPLPzzdxTlnLsDn9DUpdP5Fnc8I7NajvnrxHc8SoaLFOpbpnztz8Q+k\nrsi5PpS/e38qrV4WoCg7OiU=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-zpkl7@lean-node-task-266b7.iam.gserviceaccount.com",
  "client_id": "117826182877669313971",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zpkl7%40lean-node-task-266b7.iam.gserviceaccount.com"
}
};
