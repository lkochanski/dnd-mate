import React from 'react';
import SideNavbar from "../../components/Sidenavbar/SideNavbar";

import {
  getDatabase,
  ref,
  set,
  onValue} from "firebase/database"

const DashboardPage = () => {

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
      <SideNavbar panelTitle={"Dashboard"}>
        <div>
          Dashboard Page
        </div>
      </SideNavbar>
    </>
  );
};

export default DashboardPage;
