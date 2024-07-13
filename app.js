import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDXY5nZjjW9rx9XZ4G1OjQ6YXTtr2siqYg",
  authDomain: "practice-4b3f2.firebaseapp.com",
  projectId: "practice-4b3f2",
  storageBucket: "practice-4b3f2.appspot.com",
  messagingSenderId: "1078261343174",
  appId: "1:1078261343174:web:33e846d5ba7a48314208c7",
  measurementId: "G-80QHQP1LK4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let btn = document.getElementById("btn");
if (btn) {
  btn.addEventListener("click", async () => {
    getUl.innerHTML = "";
    let getInp = document.getElementById("inp");
    const docRef = await addDoc(collection(db, "todos"), {
      name: getInp.value,
    });
    console.log("Document written with ID: ", docRef.id);
    fetchData();
  });
}

let getUl = document.getElementById("ul");

async function fetchData() {
  const q = collection(db, "todos");
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data().name);
    getUl.innerHTML += `<li> ${doc.data().name} <button onclick="delItem('${
      doc.id
    }')">Delete</button> <button onclick="editItem('${
      doc.id
    }')"> Edit</button> </li>`;
  });
}
fetchData();

async function delItem(e) {
  getUl.innerHTML = "";
  console.log(e);
  await deleteDoc(doc(db, "todos", e));
  console.log("Item has deleted");
  fetchData();
}

async function editItem(e) {
  getUl.innerHTML = "";
  const washingtonRef = doc(db, "todos", e);
  let pro = prompt("Enter updated value");
  await updateDoc(washingtonRef, {
    name: pro,
  });
  fetchData();
}

window.delItem = delItem;
window.editItem = editItem;
