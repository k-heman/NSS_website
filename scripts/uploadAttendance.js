import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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

const attendanceData = [
  {
    "ID": "B240329",
    "FULL NAME": "PATIL SHIVANAND",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B251743",
    "FULL NAME": "GADHE TEJAS RISHI",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250060",
    "FULL NAME": "A. VAISHNAVI",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B240256",
    "FULL NAME": "A.GOUTHAMI",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B240685",
    "FULL NAME": "A.HANSIKA",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B250072",
    "FULL NAME": "A.SAI SHRUTHIKA",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B251664",
    "FULL NAME": "ADIKE LIKITH",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B250047",
    "FULL NAME": "ALLEPU SAHASRA",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250002",
    "FULL NAME": "ALLIKANTI NANDINI",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250048",
    "FULL NAME": "ALUBOILA RAVALI",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B230150",
    "FULL NAME": "AMAROJI GAYATHRI",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B240512",
    "FULL NAME": "AMINA ADIBA",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250064",
    "FULL NAME": "ANGALAA HYNDHAVI",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B240590",
    "FULL NAME": "ASOLLA RISHITHA",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Present",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250120",
    "FULL NAME": "B.DEVAHARSHINI",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B241389",
    "FULL NAME": "B.NANDINI",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B240011",
    "FULL NAME": "BAKKANNAGIRI ROHINI",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250118",
    "FULL NAME": "BANDA VAISHNAVI",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B241386",
    "FULL NAME": "BANOTH VAISHNAVI",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250145",
    "FULL NAME": "BANOTHU SEVITHA SRIRAMI",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B250142",
    "FULL NAME": "BANOTHU VISHAL",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B240675",
    "FULL NAME": "BELDE SAHITHI",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B250187",
    "FULL NAME": "BHUKYA SANDHYA",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250209",
    "FULL NAME": "BOGOJU KEERTHANA",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B240281",
    "FULL NAME": "BOPPA CHANDHANA",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B250252",
    "FULL NAME": "BYAGARI ABHIGNA",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B240659",
    "FULL NAME": "CH.TEJASRI",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250264",
    "FULL NAME": "CHALLA NIKHITHA",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250271",
    "FULL NAME": "CHANTI LAVANYA",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B250275",
    "FULL NAME": "CHARLAPALLY HARIKA",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B250280",
    "FULL NAME": "CHELLAPURAM SINDHU REDDY",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250269",
    "FULL NAME": "CHENDRUPATLA SAKETH",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B250305",
    "FULL NAME": "CHILUVERU MOUNASREE",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250316",
    "FULL NAME": "CHITANKUNTLA HEMANTH KUMAR",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B250329",
    "FULL NAME": "CHITLA GANESH",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B240905",
    "FULL NAME": "D.AKSHITHA",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B240265",
    "FULL NAME": "D.ANUSHKA",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B251684",
    "FULL NAME": "DADE RUTHWIK REDDY",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B240784",
    "FULL NAME": "EEARRA GANGAMANI",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Present",
    "24-01-2026": "Present"
  },
  {
    "ID": "B250433",
    "FULL NAME": "ERRAGOLLA SHARANYA",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B240198",
    "FULL NAME": "ERUKALA NANDHINI",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B230328",
    "FULL NAME": "G.BHARGAVI",
    "26-10-2025": "Absent",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B240244",
    "FULL NAME": "G.PAVANI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Present",
    "24-01-2026": "Present"
  },
  {
    "ID": "B240290",
    "FULL NAME": "G.SWATHI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B251692",
    "FULL NAME": "GADDALA AKSHAYA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250450",
    "FULL NAME": "GADDALA GOUTHAMI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250461",
    "FULL NAME": "GADDAM VARSHIKA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B241158",
    "FULL NAME": "GADDAPATI RUKMINI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B240579",
    "FULL NAME": "GANGU VAISHNAVI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250488",
    "FULL NAME": "GANGURI VAIDHEHI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B250505",
    "FULL NAME": "GOLUSULA ABHIGNASRI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250507",
    "FULL NAME": "GONE VAISHNAVI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B251513",
    "FULL NAME": "GOPARAPU DEEPIKA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Present",
    "24-01-2026": "Present"
  },
  {
    "ID": "B250531",
    "FULL NAME": "GUGLOTH JAHNAVI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250561",
    "FULL NAME": "GURRAM KEERTHANA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250615",
    "FULL NAME": "JASYA BEGUM",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B231531",
    "FULL NAME": "JILLA DURGA PRASAD",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250624",
    "FULL NAME": "JILLA SAHASRA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B240822",
    "FULL NAME": "K.DHARANI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B240239",
    "FULL NAME": "K.LAXMI PRASANNA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B240885",
    "FULL NAME": "K.NIDHI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B241516",
    "FULL NAME": "K.SAIJYOTHI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B240762",
    "FULL NAME": "K.SATHVIKA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B250723",
    "FULL NAME": "K.SPOORTHI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B240451",
    "FULL NAME": "K.SUPRIYA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Present",
    "24-01-2026": "Present"
  },
  {
    "ID": "B250666",
    "FULL NAME": "KAMMARI SHRAVYA SHRI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250671",
    "FULL NAME": "KANCHERI HARIKA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B230654",
    "FULL NAME": "KANJARLA RAVALI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250683",
    "FULL NAME": "KANTRAPALLY POULU",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250686",
    "FULL NAME": "KARAMSHETTY HASIKA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B250732",
    "FULL NAME": "KODAKANTI BALARAJ",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250754",
    "FULL NAME": "KONAKALLA JOSHNAVI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B240262",
    "FULL NAME": "KONAPURAM RUCHITHA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B250766",
    "FULL NAME": "KONDOLLU POOJA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B250768",
    "FULL NAME": "KONERU RAHUL",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B230190",
    "FULL NAME": "KOSHOLLA SPOORTHI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250787",
    "FULL NAME": "KOTHADEDARYAS",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B230414",
    "FULL NAME": "L.TEJASWI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B240928",
    "FULL NAME": "M.BALA RANI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B240073",
    "FULL NAME": "MADUGANI KAVYANJALI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B250896",
    "FULL NAME": "MALOTH PREM KRISH",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B250705",
    "FULL NAME": "MANOHAR SAH KATEPALLI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B250938",
    "FULL NAME": "MARAVENI SHRANYA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B241084",
    "FULL NAME": "MD.ASMA BEGUM",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B251009",
    "FULL NAME": "MD.IMTHIYAZ",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B251027",
    "FULL NAME": "MOTURRI KEERTHI SRI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B251054",
    "FULL NAME": "MUNNURU MADHUMITHA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B251063",
    "FULL NAME": "MUTHAYALA SOWMYA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B240138",
    "FULL NAME": "N.SOUJANYA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B251121",
    "FULL NAME": "NUNE NAVYA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B241156",
    "FULL NAME": "P.MANISH",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B241035",
    "FULL NAME": "P.PAVANI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Present",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B251157",
    "FULL NAME": "PAKANATI SHIVANI REDDY",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B240656",
    "FULL NAME": "PALLE KEERTHI REDDY",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Present",
    "24-01-2026": "Present"
  },
  {
    "ID": "B240433",
    "FULL NAME": "PAMULAPARTHY DEEPIKA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B251178",
    "FULL NAME": "PANDIRLA SANJANA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B251187",
    "FULL NAME": "PARPALLY JOHANNA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B251200",
    "FULL NAME": "PATHIREDDY HARINI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B251202",
    "FULL NAME": "PATHLAVATH RAHUL",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B251203",
    "FULL NAME": "PATRI AKHIL",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B251201",
    "FULL NAME": "PATTHIREDDI SRI HARSHINI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Present",
    "24-01-2026": "Present"
  },
  {
    "ID": "B251210",
    "FULL NAME": "PEDDI VAISHNAVI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B251261",
    "FULL NAME": "POTHULA RUCHITHA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B251282",
    "FULL NAME": "PUTTA HARINI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B240255",
    "FULL NAME": "R.DEEPTHI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B240227",
    "FULL NAME": "R.SREEJA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B251324",
    "FULL NAME": "RAYANAPETA ROHITH",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B251344",
    "FULL NAME": "SADHULA BHANUPRIYA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B230367",
    "FULL NAME": "SADULA SRIJA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B251350",
    "FULL NAME": "SAKALI MANASA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B240556",
    "FULL NAME": "SALLARAM MANOGNA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Present",
    "24-01-2026": "Present"
  },
  {
    "ID": "B251408",
    "FULL NAME": "SHAIK YASMIN",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B251416",
    "FULL NAME": "SHERI ANANYA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B240525",
    "FULL NAME": "SPANDANA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B251512",
    "FULL NAME": "T.SHANMUKHAPRIYA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B251488",
    "FULL NAME": "TELUKUNTLA NAVYASRI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B251745",
    "FULL NAME": "THOTA HARINI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B251525",
    "FULL NAME": "THURPATI RISHIKA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B251132",
    "FULL NAME": "UGGU JYOSHNAVI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B251554",
    "FULL NAME": "UTTERAPALLY VARSHA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B251575",
    "FULL NAME": "V.KEERTHIKA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B230927",
    "FULL NAME": "VANGA CHANDANA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B251607",
    "FULL NAME": "VISHWANATHAM VAGDEVI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Present",
    "24-01-2026": "Present"
  },
  {
    "ID": "B251616",
    "FULL NAME": "VOLLALA RUCHITHA",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Present"
  },
  {
    "ID": "B230813",
    "FULL NAME": "VOLLALA SAHITI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  },
  {
    "ID": "B251639",
    "FULL NAME": "YELUGODLA VAISHNAVI",
    "26-10-2025": "Present",
    "04-01-2026": "Absent",
    "10-01-2026": "Absent",
    "24-01-2026": "Absent"
  }
];

// Sort in ascending order by ID
attendanceData.sort((a, b) => a.ID.localeCompare(b.ID));

async function uploadData() {
  console.log("Starting upload of Attendance...");
  let count = 0;
  for (const record of attendanceData) {
    const id = record.ID.trim();
    const docRef = doc(db, "Attendance", id);
    try {
      await setDoc(docRef, record);
      count++;
    } catch (e) {
      console.error("Error for", id, e);
    }
  }
  console.log(`Successfully uploaded ${count} attendance records.`);
  process.exit(0);
}

uploadData();
