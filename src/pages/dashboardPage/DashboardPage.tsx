import React from 'react';
import {UserAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import SideNavbar from "../../components/SideNavbar";

import {
  getDatabase,
  ref,
  set,
  onValue} from "firebase/database"

const DashboardPage = () => {
  const {user, logout}: any = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/sign-in");
    } catch(e: any) {
      console.log(e.message)
    }
  }

  function writeUserData(userId: string) {
    const db = getDatabase();
    set(ref(db, `/users/${userId}/characters/${userId}-Orgrim-Wielki` ), {
      id: `${userId}-Orgrim-Wielki`,
      name: "Orgrim Wielki",
      level: 15,
      characterClass: "barbarzyńca",
      cantrips: [
        {
          name: "fireSpell"
        },
        {
          name: "BamBam"
        },
      ],
      spells: [
        {
          name: "Shout",
        },
        {
          name: "Big bash"
        }
      ]
    });
  }

  const getUserData = (userId: string, characterName: string) => {
    const db = getDatabase();
    const characterSheetId = `${userId}-${characterName}`
    const characterSheetData = ref(db, `/users/${userId}/characters/${characterSheetId}`);
    onValue(characterSheetData, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  }


  return (
    <>
      <SideNavbar panelTitle={"Characters"}/>
      <h3>DashboardPage</h3>
      <h4>User Email: {user && user.email}</h4>
      <button onClick={handleLogout}>LogOut</button>
    </>
  );
};

export default DashboardPage;
