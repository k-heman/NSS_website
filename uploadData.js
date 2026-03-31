import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUb5WlH9HVnZztPP6DClLTXtbdyznieeI",
  authDomain: "nss-rguktb.firebaseapp.com",
  projectId: "nss-rguktb",
  storageBucket: "nss-rguktb.firebasestorage.app",
  messagingSenderId: "174332138615",
  appId: "1:174332138615:web:6bd5089ed1455479a4e272",
  measurementId: "G-2FSD17DRXQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const usersData = [
  { "S. No.": 1, "NAME": "PATIL SHIVANAND", "ID": "B240329 ", "UNIT": 5, "GENDER": "MALE ", "BATCH": "P2" },
  { "S. No.": 2, "NAME": "GADDAPATI RUKMINI", "ID": "B241158 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 3, "NAME": "PARLAPALLI JOHANNA", "ID": "B251187 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 4, "NAME": "AMAROJI GAYATHRI", "ID": "B230150 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "E1" },
  { "S. No.": 5, "NAME": "KUSHOLLA SPURTHI", "ID": "B230190 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "E1" },
  { "S. No.": 6, "NAME": "G. BHARGAVI", "ID": "B230328 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "E1" },
  { "S. No.": 7, "NAME": "SADULA SREEJA", "ID": "B230367 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "E1" },
  { "S. No.": 8, "NAME": "L. TEJASWI", "ID": "B230414 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "E1" },
  { "S. No.": 9, "NAME": "KONJARLA RAVALI", "ID": "B230654 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "E1" },
  { "S. No.": 10, "NAME": "VOLLALA SAHITHI", "ID": "B230813 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "E1" },
  { "S. No.": 11, "NAME": "VANGA CHANDANA", "ID": "B230927 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "E1" },
  { "S. No.": 12, "NAME": "JILLA DURGA PRASAD", "ID": "B231531 ", "UNIT": 5, "GENDER": "MALE ", "BATCH": "E1" },
  { "S. No.": 13, "NAME": "BAKKANNAGIRI ROHINI", "ID": "B240011 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 14, "NAME": "MADUGANI KAVYANJALI", "ID": "B240073 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 15, "NAME": "N. SOUJANYA", "ID": "B240138 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 16, "NAME": "BELDE SAHITHI", "ID": "B240675 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 17, "NAME": "ERUKALA NANDINI", "ID": "B240198 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 18, "NAME": "R. SREEJA", "ID": "B240227 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 19, "NAME": "K. LAXMI PRASANNA", "ID": "B240239 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 20, "NAME": "GADE PAVANI", "ID": "B240244 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 21, "NAME": "R. DEEPTHI", "ID": "B240255 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 22, "NAME": "A. GOUTHAMI", "ID": "B240256 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 23, "NAME": "KONAPURAM RUCHITHA", "ID": "B240262 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 24, "NAME": "D. ANUSHKA", "ID": "B240265 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 25, "NAME": "BOPPA CHANDHANA", "ID": "B240281 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 26, "NAME": "G. SWATHI YADAV", "ID": "B240290 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 27, "NAME": "PAMULAPARTHI DEEPIKA", "ID": "B240433 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 28, "NAME": "K. SUPRIYA", "ID": "B240451 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 29, "NAME": "AMENA ADIBA", "ID": "B240512 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 30, "NAME": "SPANDANA", "ID": "B240525 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 31, "NAME": "SALLARAM MANOGNA", "ID": "B240556 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 32, "NAME": "GANGU VAISHNAVI", "ID": "B240579 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 33, "NAME": "ASOLLA RISHITHA", "ID": "B240590 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 34, "NAME": "PALLE KEERTHI REDDY", "ID": "B240656 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 35, "NAME": "CH. TEJASRI", "ID": "B240659 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 36, "NAME": "A. HANSIKA", "ID": "B240685 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 37, "NAME": "KOTHINTI SATHVIKA", "ID": "B240762 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 38, "NAME": "ERRA GANGAMANI", "ID": "B240784 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 39, "NAME": "K. DHARANI", "ID": "B240822 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 40, "NAME": "K. NIDHI", "ID": "B240885 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 41, "NAME": "D. AKSHITHA", "ID": "B240905 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 42, "NAME": "M. BALA RANI", "ID": "B240928 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 43, "NAME": "P. PAVANI", "ID": "B241035 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 44, "NAME": "MD. ASMA BEGUM", "ID": "B241084 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 45, "NAME": "PARSA MANISHA", "ID": "B241156 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 46, "NAME": "BANOTH VAISHNAVI", "ID": "B241386 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 47, "NAME": "B. NANDINI", "ID": "B241389 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 48, "NAME": "K. SAIJYOTHI", "ID": "B241516 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P2" },
  { "S. No.": 49, "NAME": "ALLIKANTI NANDINI", "ID": "B250002 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 50, "NAME": "ALLEPU SAHASRA", "ID": "B250047 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 51, "NAME": "ALUBOINA RAVALI", "ID": "B250048 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 52, "NAME": "A.  VAISHNAVI", "ID": "B250060 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 53, "NAME": "ANGALAA HYNDHAVI", "ID": "B250064 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 54, "NAME": "A. SAI SHRUTHIKA", "ID": "B250072 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 55, "NAME": "BANDA VAISHNAVI", "ID": "B250118 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 56, "NAME": "B. DEVAHARSHINI", "ID": "B250120 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 57, "NAME": "BANOTH VISHAL", "ID": "B250142 ", "UNIT": 5, "GENDER": "MALE ", "BATCH": "P1" },
  { "S. No.": 58, "NAME": "BANOTHU SEVITHA SRIRAMI", "ID": "B250145 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 59, "NAME": "BHUKYA SANDHYA", "ID": "B250187 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 60, "NAME": "BOGOJU KEERTHANA", "ID": "B250209 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 61, "NAME": "BYAGARI ABHIGNA", "ID": "B250252 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 62, "NAME": "CHALLA NIKHITHA", "ID": "B250264 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 63, "NAME": "CHANDRUPATLA SAKETH", "ID": "B250269 ", "UNIT": 5, "GENDER": "MALE ", "BATCH": "P1" },
  { "S. No.": 64, "NAME": "CHANTI LAVANYA", "ID": "B250271 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 65, "NAME": "CHARLAPALLY HARIKA", "ID": "B250275 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 66, "NAME": "CHELLAPURAM SINDHU REDDY", "ID": "B250280 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 67, "NAME": "CHILUVERU MOUNASREE", "ID": "B250305 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 68, "NAME": "CHINTHAKUNTLA HEMANTH KUMAR", "ID": "B250316 ", "UNIT": 5, "GENDER": "MALE ", "BATCH": "P1" },
  { "S. No.": 69, "NAME": "CHITLA GANESH", "ID": "B250329 ", "UNIT": 5, "GENDER": "MALE ", "BATCH": "P1" },
  { "S. No.": 70, "NAME": "ERRAGOLLA SHARANYA", "ID": "B250433 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 71, "NAME": "GADDALA GOUTHAMI", "ID": "B250450 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 72, "NAME": "GADDAM VARSHIKA", "ID": "B250461 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 73, "NAME": "GANGURI VYDEHI", "ID": "B250488 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 74, "NAME": "GOLUSULA ABHIGNASRI", "ID": "B250505 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 75, "NAME": "GONE VAISHNAVI", "ID": "B250507 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 76, "NAME": "GUGLOTH JAHNAVI", "ID": "B250531 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 77, "NAME": "GURRAM KEERTHANA", "ID": "B250561 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 78, "NAME": "JASYA BEGUM", "ID": "B250615 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 79, "NAME": "JILLA SAHASRA", "ID": "B250624 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 80, "NAME": "KAMMARI SHRAVYA SHRI", "ID": "B250666 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 81, "NAME": "KANCHARI HARIKA", "ID": "B250671 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 82, "NAME": "KANTRAPALLY POULU", "ID": "B250683 ", "UNIT": 5, "GENDER": "MALE ", "BATCH": "P1" },
  { "S. No.": 83, "NAME": "KARAMSHETTY HASIKA", "ID": "B250686 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 84, "NAME": "KATEPALLI MANOHARSHA", "ID": "B250705 ", "UNIT": 5, "GENDER": "MALE ", "BATCH": "P1" },
  { "S. No.": 85, "NAME": "K. SPOORTHI", "ID": "B250723 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 86, "NAME": "KODAKANTI BALRAJ", "ID": "B250732 ", "UNIT": 5, "GENDER": "MALE ", "BATCH": "P1" },
  { "S. No.": 87, "NAME": "KONAKALLA JOSHNAVI", "ID": "B250754 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 88, "NAME": "KONDOLLU POOJA", "ID": "B250766 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 89, "NAME": "KONERU RAHUL", "ID": "B250768 ", "UNIT": 5, "GENDER": "MALE ", "BATCH": "P1" },
  { "S. No.": 90, "NAME": "KOTHA VEDAVYAS", "ID": "B250787 ", "UNIT": 5, "GENDER": "MALE ", "BATCH": "P1" },
  { "S. No.": 91, "NAME": "MALOTH PREMKRISH", "ID": "B250896 ", "UNIT": 5, "GENDER": "MALE ", "BATCH": "P1" },
  { "S. No.": 92, "NAME": "MARAVENI SHARANYA", "ID": "B250938 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 93, "NAME": "MD. IMTHIYAZ", "ID": "B251009 ", "UNIT": 5, "GENDER": "MALE ", "BATCH": "P1" },
  { "S. No.": 94, "NAME": "MOTURRI KEERTHI SRI", "ID": "B251027 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 95, "NAME": "MUNNURU MADHUMITHA", "ID": "B251054 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 96, "NAME": "MUTHKALA SOUMYA", "ID": "B251063 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 97, "NAME": "NUNE NAVYA", "ID": "B251121 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 98, "NAME": "OGGU JYOSHNAVI", "ID": "B251132 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 99, "NAME": "PAKANATI SHIVANI REDDY", "ID": "B251157 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 100, "NAME": "PANDIRLA SANJANA", "ID": "B251178 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 101, "NAME": "PATHIREDDY HARINI", "ID": "B251200", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 102, "NAME": "PATHIREDDY SRI HARSHINI", "ID": "B251201 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 103, "NAME": "PATHLAVATH RAHUL", "ID": "B251202 ", "UNIT": 5, "GENDER": "MALE ", "BATCH": "P1" },
  { "S. No.": 104, "NAME": "PATRI AKHIL", "ID": "B251203 ", "UNIT": 5, "GENDER": "MALE ", "BATCH": "P1" },
  { "S. No.": 105, "NAME": "PEDDI VAISHNAVI", "ID": "B251210 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 106, "NAME": "POTTABATHINI SATHVIKA", "ID": "B251261 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 107, "NAME": "PUTTA HARINI", "ID": "B251282 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 108, "NAME": "RAYANAPETA ROHITH", "ID": "B251324 ", "UNIT": 5, "GENDER": "MALE ", "BATCH": "P1" },
  { "S. No.": 109, "NAME": "SADHULA BHANUPRIYA", "ID": "B251344 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 110, "NAME": "SAKALI MANASA", "ID": "B251350 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 111, "NAME": "SHAIK YASMIN", "ID": "B251408 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 112, "NAME": "SHERI ANANYA", "ID": "B251416 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 113, "NAME": "TELUKUNTLA NAVYASRI", "ID": "B251488 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 114, "NAME": "T. SHANMUKHAPRIYA", "ID": "B251512 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 115, "NAME": "THOPARAPU DEEPIKA", "ID": "B251513 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 116, "NAME": "THURPATI RISHIKA", "ID": "B251525 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 117, "NAME": "UTTERAPALLY VARSHA", "ID": "B251554 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 118, "NAME": "V. KEERTHIKA", "ID": "B251575 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 119, "NAME": "VISHWANATHAM VAGDEVI", "ID": "B251607 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 120, "NAME": "VOLLALA RUCHITHA", "ID": "B251616 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 121, "NAME": "YELUGODLA VAISHNAVI", "ID": "B251639 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 122, "NAME": "ADIKE LIKITH", "ID": "B251664 ", "UNIT": 5, "GENDER": "MALE ", "BATCH": "P1" },
  { "S. No.": 123, "NAME": "DADE RUTHWIK REDDY", "ID": "B251684 ", "UNIT": 5, "GENDER": "MALE ", "BATCH": "P1" },
  { "S. No.": 124, "NAME": "GADDALA AKSHAYA", "ID": "B251692 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" },
  { "S. No.": 125, "NAME": "GADE TEJAS RISHI", "ID": "B251743 ", "UNIT": 5, "GENDER": "MALE ", "BATCH": "P1" },
  { "S. No.": 126, "NAME": "THOTA HARINI", "ID": "B251745 ", "UNIT": 5, "GENDER": "FEMALE ", "BATCH": "P1" }
];

async function uploadData() {
  console.log("Starting upload...");
  let count = 0;
  for (const user of usersData) {
    // ID will be the username essentially, trim any spaces.
    const username = user.ID.trim();
    // Use username as the document ID in 'users' collection for uniqueness and easy lookup
    const docRef = doc(db, "users", username);
    try {
      await setDoc(docRef, {
        username: username,
        role: "user", // Base role
        name: user.NAME.trim(),
        unit: user.UNIT,
        gender: user.GENDER.trim(),
        batch: user.BATCH.trim(),
        serialNumber: user["S. No."]
      }, { merge: true });
      count++;
    } catch (e) {
      console.error("Error for", username, e);
    }
  }
  console.log(`Successfully uploaded ${count} users.`);
  process.exit(0);
}

uploadData();
