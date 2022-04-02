const firebase = require("firebase-admin");

const firebase_config = {
  url: "https://lean-node-task-5c197.firebaseio.com",
  type: "service_account",
  project_id: "lean-node-task-5c197",
  private_key_id: "65fb8ded4239b3a7102a76fb05ee82ee101da5fe",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDZ475a6bkf0T74\nLpD9pwF/kiqpqzaJZmR6CXZlZw/22nPudGNRC4B4zm/UhrTZtQ31iuk8iiCHEglY\nsXOt+8ecJn8Fzx1aveQC6cBHWjtTWgGd+gj0k+neoZHlH5K2yulo5TTnTYz17kxZ\n1wmmWAOegiNKhyjVEVAYUrPI3AXYkk65Iijz819m4Z+LaBD+6H1fUTEmhQ03Wv+k\nCJaduWQ87/K676o3xedQE0vi3N5UzyFZCYTyetSiuTA4swDD7D0yuqER2O/8oSfW\nDqeEivCi6W5HNvknr9KbMEs9cMNctBefRm/6+hOgatG31+l9jswdqGF4tSsKUVPR\ninY8gbFRAgMBAAECggEAI/bUuKoosE5tbQbipRDSd9K8eqeT/OHgZnRMDTi8XdZ4\n7ucEbaAkYyGlO8Ma9BmlEDO5g7tDhd09mwd550HOahZrPkjiuNOXCxQMyg+Os0IB\nT6ixnw0QZnrssJD25SJg8btuHAT6O1hLVJjgiDWxgzxKbvFtlUhM8XbVI1Y4cM0y\nJhjFympbnIPqmOuyGGqwY3iK7nbXb77s0IogGdN7yPUHkag47YeFYC+Z0eNbd4rp\nWVqrv6UXA05c2ggnRrKzcR1eonJUm5t0JAIgl0FCInbIYBC583kLFaHplt/YT939\nIQ1bC5ZKTreIZ8ilPZSjCpYZCQC+OMxNZo3JpKyfMQKBgQDunzIU57sD5iQ2GbH1\n0pGeGzel2c5PSnRJy7S4jYqkicl2T3tbTq7gB6Kth1DA1mC8w2jrJ8dfIF1uDKcW\nlvZD+11Zhu1K2BemJOTsi7HPQ6VTHXskVf7rGil6ZS6BIt92dH0d5wnrk94smdYT\nxaBcIajJpKpfiwnek1JY8eNcfwKBgQDpwgWBn5tTrCt2dNABAxROGMDyKJr176dW\nBv1s0OT/9ymAte1qYmfVVuZ1PRnjXYbjteAX7DEbwmmjffANiyqugAPED2z6GqjA\nVw2qFuAqZzpB0A/YIKnm32naAikY/cKGfrGO1ELxDr8GwytF33S/1cpu3EyCYYbc\nlDE7HXlKLwKBgEVmzdUgtNbkd8G4ZXb+wFWAywWUvJl5KStRcQWAPUOvw4WChnk/\nAEOuVNUtlwIPF+Gu3/QNBMKZEjNwwKQkUgnhsPvZ72gmQ3KSJnbaBmQm442x9F/U\nFylf2ZJ8nTL35pB4Pu+Ug+Edh6/nKklj4EkLjSDgoKDbOoqexIOUDrGXAoGACEvg\nkicuBhw4Nq4Sq9aGI/dw8adLSKtGzyDUYcZQOl11VaIfWQVBFitNZp/SiWVKYk6U\nM4UogQm3YhwYJwLncuYMPCsn/QBxONJeI8lID3k2chuGVG9kWFNZmGk3ODHZc5iP\niLgz4AZb9Ut7/7DcnepikuiytnXrqWyBCs4S/fUCgYEAqCNXfUqjJts8w5k+Yu5H\n3KU6b6YDV5+vqgA8QQluUhinK5FzXJy/VoqPgSfeV0XVC7wXJjg4sIlmiA/Pr+Ju\niwfWCWu1+oqvUI2YUMJ+T+C0L4vB5lKR/twrrhdEunQy2OSBwAG3LM7DMVPTbpRW\nw6JKErB1/mwB+gVyZp0nxXQ=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-zi0x5@lean-node-task-5c197.iam.gserviceaccount.com",
  client_id: "109936309311512788529",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zi0x5%40lean-node-task-5c197.iam.gserviceaccount.com",
}

/**
 * @todo
 * Load .env Environment instead of (firebase_config)
 * process.env.
 */


module.exports.db_connection = () => {
  firebase.initializeApp({
    credential: firebase.credential.cert(firebase_config),
    databaseURL: firebase_config.url,
  });
  return firebase.firestore();
}
