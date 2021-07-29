import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import { Dimensions } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Alert,
  LogBox,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Card, TextInput, Button } from "react-native-paper";
import { Icon, SocialIcon, ListItem, Avatar } from "react-native-elements";
import * as firebase from "firebase";
import MultiSelect from "react-native-multiple-select";
import DropDownPicker from "react-native-dropdown-picker";

const addPatientPage = ({ navigation }) => {
  const win = Dimensions.get("window");
  const [Name, setName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userAge, setUserAge] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [userGender, setUserGender] = useState("");
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState("");
  // patient history dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: "Hypertension", value: "Hypertension" },
    { label: "Sugar", value: "Sugar" },
    { label: "Long Term Medication", value: "Long Term Medication" },
    { label: "PreMedicine", value: "PreMedicine" },
    { label: "Thyroid", value: "Thyroid" },
    { label: "Arthiritis", value: "Arthiritis" },
    { label: "No relevant History", value: "No relevant History" },
  ]);

  // C/O
  const [openCO, setOpenCO] = useState(false);
  const [valueCO, setValueCO] = useState([]);
  const [itemsCO, setItemsCO] = useState([
    { label: "Decrease Vision", value: "Decrease Vision" },
    { label: "Blurred Vision", value: "Blurred Vision" },
    { label: "Headache", value: "Headache" },
    { label: "Itching", value: "Itching" },
    { label: "Pain", value: "Pain" },
    { label: "Redness", value: "Redness" },
    { label: "Discharge", value: "Discharge" },
    { label: "Irritation", value: "Irritation" },
    { label: "Foreign Body Sensation", value: "Foreign Body Sensation" },
    { label: "Foreign Body", value: "Foreign Body" },
    { label: "Heaviness", value: "Heaviness" },
    { label: "Watering", value: "Watering" },
    { label: "Eye Ache", value: "Eye Ache" },
    { label: "Sudden Loss Of Vision", value: "Sudden Loss Of Vision" },
    { label: "Night Blindness", value: "Night Blindness" },
  ]);

  // Diagnosis
  const [openDiagnosis, setOpenDiagnosis] = useState(false);
  const [valueDiagnosis, setValueDiagnosis] = useState([]);
  const [itemsDiagnosis, setItemsDiagnosis] = useState([
    { label: "Allergy Conjuctivitis", value: "Allergy Conjustivitis" },
    { label: "Conjuctivitis", value: "Conjuctivitis" },
    { label: "Viral Conjuctivitis", value: "Viral Conjuctivitis" },
    {
      label: "Vernal KeratoConjuctivitis (Spring catarrh)",
      value: "Vernal KeratoConjuctivitis (Spring catarrh)",
    },
    { label: "Refractive Errors", value: "Refractive Errors" },
    { label: "Myopia", value: "Myopia" },
    { label: "High-Myopia", value: "High-Myopia" },
    { label: "Hypermatropia", value: "Hypermatropia" },
    { label: "Astigmatism", value: "Astigmatism" },
    { label: "Presbyopia", value: "Presbyopia" },
    { label: "No Acceptance of Glasses", value: "No Acceptance of Glasses" },
    { label: "Dry Eyes", value: "Dry Eyes" },
    { label: "Computer Vision Syndrome", value: "Computer Vision Syndrome" },
    { label: "Blepharitis", value: "Blepharitis" },
    { label: "trachoma", value: "trachoma" },
    {
      label: "Age related Macular Degeneration",
      value: "Age related Macular Degeneration",
    },
    { label: "Cataract", value: "Cataract" },
    { label: "Diabetic Retinopathy", value: "Diabetic Retinopathy" },
    { label: "Glaucoma", value: "Glaucoma" },
    { label: "Amblyopia", value: "Amblyopia" },
    { label: "Keratitis", value: "Keratitis" },
    { label: "Ocular herpes", value: "Ocular herpes" },
    { label: "herpes zoster", value: "herpes zoster" },
    { label: "Corneal dystrophies", value: "Corneal dystrophies" },
    { label: "Keratoconus", value: "Keratoconus" },
    { label: "Corneal Ulcer", value: "Corneal Ulcer" },
    { label: "Bullous keratopathy", value: "Bullous keratopathy" },
    { label: "Cogan Syndrome", value: "Cogan Syndrome" },
    { label: "Interstitial keratitis", value: "Interstitial keratitis" },
    { label: "KeratoConjuctivitis sicca", value: "KeratoConjuctivitis sicca" },
    { label: "Keratomalacia", value: "Keratomalacia" },
    {
      label: "Peripheral ulcerative keratitis",
      value: "Peripheral ulcerative keratitis",
    },
    {
      label: "Phlyctenular keratoconjuctivitis",
      value: "Phlyctenular keratoconjuctivitis",
    },
    {
      label: "Superficial punctate keratitis",
      value: "Superficial punctate keratitis",
    },
    { label: "CRVO", value: "CRVO" },
    { label: "BRVO", value: "BRVO" },
    { label: "RD", value: "RD" },
    { label: "CSME", value: "CSME" },
    { label: "CSMD", value: "CSMD" },
  ]);

  // treatment-1
  const [openTreatment1, setOpenTreatment1] = useState(false);
  const [valueTreatment1, setValueTreatment1] = useState([]);
  const [itemsTreatment1, setItemsTreatment1] = useState([
    { label: "OFLUS", value: "OFLUS" },
    { label: "GATFLOS", value: "GATFLOS" },
    { label: "MOFLUS-T", value: "MOFLUS-T" },
    { label: "MOFLUS", value: "MOFLUS" },
    { label: "TINIC", value: "TINIC" },
    { label: "ANANAC", value: "ANANAC" },
    { label: "KETEXO", value: "KETEXO" },
    { label: "MOFLUS-KT", value: "MOFLUS-KT" },
    { label: "OKULAC", value: "OKULAC" },
    { label: "OKULAC-D", value: "OKULAC-D" },
    { label: "OKULAC-AH", value: "OKULAC-AH" },
    { label: "ZYFLUR", value: "ZYFLUR" },
    { label: "MOFLUS-BR", value: "MOFLUS-BR" },
    { label: "OKULAC-LS", value: "OKULAC-LS" },
    { label: "GATFLOS-F", value: "GATFLOS-F" },
    { label: "ACT-ONE250", value: "ACT-ONE250" },
    { label: "TIMOLUS-BT", value: "TIMOLUS-BT" },
    { label: "GATFLOS-B", value: "GATFLOS-B" },
    { label: "HOLIF", value: "HOLIF" },
    { label: "HOLIF-T", value: "HOLIF-T" },
    { label: "MOFLUS-B", value: "MOFLUS-B" },
    { label: "OFLUS-D", value: "OFLUS-D" },
    { label: "P-REX-B", value: "P-REX-B" },
    { label: "MOFLUS-LT", value: "MOFLUS-LT" },
    { label: "LAPT", value: "LAPT" },
    { label: "PREXO", value: "PREXO" },
    { label: "MOFLUS-P", value: "MOFLUS-P" },
    { label: "MOFLUS-D", value: "MOFLUS-D" },
    { label: "HYON-C", value: "HYON-C" },
    { label: "NATOK", value: "NATOK" },
    { label: "CUCOLUS", value: "CUCOLUS" },
    { label: "PATINE", value: "PATINE" },
    { label: "PUPILOWIDE", value: "PUPILOWIDE" },
    { label: "CATLUS", value: "CATLUS" },
    { label: "STAY SOFT", value: "STAY SOFT" },
    { label: "CARMOS", value: "CARMOS" },
    { label: "CARMOS GEL", value: "CARMOS GEL" },
    { label: "CARMOS-LS", value: "CARMOS-LS" },
    { label: "CARMOS-PLUS", value: "CARMOS-PLUS" },
    { label: "H-MOS", value: "H-MOS" },
    { label: "OSS", value: "OSS" },
    { label: "LYOK-5000", value: "LYOK-5000" },
    { label: "LYOK-VIT", value: "LYOK-VIT" },
    { label: "VITLUS", value: "VITLUS" },
    { label: "LYOKPLUS", value: "LYOKPLUS" },
    { label: "SIGHTSOFT", value: "SIGHTSOFT" },
    { label: "ME9X-OD", value: "ME9X-OD" },
    { label: "AIMS", value: "AIMS" },
    { label: "AIMS-OD", value: "AIMS-OD" },
    { label: "AIMS-KT", value: "AIMS-KT" },
    { label: "HPNC", value: "HPNC" },
    { label: "HPNC PLUS", value: "HPNC PLUS" },
    { label: "ROMAG", value: "ROMAG" },
    { label: "ACLON-P", value: "ACLON-P" },
    { label: "ACLON-SP", value: "ACLON-SP" },
    { label: "ADD-5", value: "ADD-5" },
    { label: "RIOS", value: "RIOS" },
    { label: "RIOS PLUS", value: "RIOS PLUS" },
    { label: "DEFLUS-6", value: "DEFLUS-6" },
    { label: "FEXOLUS-M", value: "FEXOLUS-M" },
    { label: "GABLUS-M", value: "GABLUS-M" },
    { label: "CFDM-200", value: "CFDM-200" },
    { label: "ROXUS-150", value: "ROXUS-150" },
    { label: "DRYCURE", value: "DRYCURE" },
    { label: "DRYCURE GEL", value: "DRYCURE GEL" },
    { label: "DRYCURE ULTRA", value: "DRYCURE ULTRA" },
    { label: "MCN", value: "MCN" },
    { label: "MCN KT", value: "MCN KT" },
    { label: "NEFACURE", value: "NEFACURE" },
    { label: "KETCURE-CP", value: "KETCURE-CP" },
    { label: "FLUROCURE-T", value: "FLUROCURE-T" },
    { label: "PATACURE", value: "PATACURE" },
    { label: "CATACURE", value: "CATACURE" },
    { label: "TIMCURE", value: "TIMCURE" },
    { label: "LYCURE", value: "LYCURE" },
    { label: "FANDUS", value: "FANDUS" },
    { label: "CATASOL", value: "CATASOL" },
    { label: "HUMOX", value: "HUMOX" },
    { label: "OPTOBS", value: "OPTOBS" },
    { label: "HUCIN-P", value: "HUCIN-P" },
    { label: "TEARIN", value: "TEARIN" },
    { label: "HUNAC", value: "HUNAC" },
    { label: "HUCROM", value: "HUCROM" },
    { label: "ALTEARS", value: "ALTEARS" },
    { label: "OCLAC", value: "OCLAC" },
    { label: "DR-SONI-P", value: "DR-SONI-P" },
    { label: "FLUTON", value: "FLUTON" },
    { label: "HUMOX-K", value: "HUMOX-K" },
    { label: "VIBS", value: "VIBS" },
    { label: "HUDIN", value: "HUDIN" },
    { label: "AKXN", value: "AKXN" },
    { label: "ATPINE", value: "ATPINE" },
    { label: "B-FAX", value: "B-FAX" },
    { label: "B-MOX", value: "B-MOX" },
    { label: "CLODIL", value: "CLODIL" },
    { label: "DD", value: "DD" },
    { label: "DEPOL", value: "DEPOL" },
    { label: "FLUROM", value: "FLUROM" },
    { label: "FLUROM-T", value: "FLUROM-T" },
    { label: "GATSAR", value: "GATSAR" },
    { label: "GSP", value: "GSP" },
    { label: "GLUMA", value: "GLUMA" },
    { label: "HYLUR", value: "HYLUR" },
    { label: "I-BRO", value: "I-BRO" },
    { label: "IFAX", value: "IFAX" },
    { label: "IFAX-D", value: "IFAX-D" },
    { label: "KEMAC", value: "KEMAC" },
    { label: "KEMAC-D", value: "KEMAC-D" },
    { label: "KEMAC-M", value: "KEMAC-M" },
    { label: "LENSACT", value: "LENSACT" },
    { label: "LOTEMIL", value: "LOTEMIL" },
    { label: "MILINEUM", value: "MILINEUM" },
    { label: "MYGIC", value: "MYGIC" },
    { label: "NPF", value: "NPF" },
    { label: "NTM", value: "NTM" },
    { label: "OPEDE", value: "OPEDE" },
    { label: "PREDSAR", value: "PREDSAR" },
    { label: "PROCAINE", value: "PROCAINE" },
    { label: "POVICARE", value: "POVICARE" },
    { label: "PG-AQUA", value: "PG-AQUA" },
    { label: "REAL TEARS", value: "REAL TEARS" },
    { label: "SOCL", value: "SOCL" },
    { label: "TEARFILM", value: "TEARFILM" },
    { label: "TEARFILM GEL", value: "TEARFILM GEL" },
    { label: "TORBIS", value: "TORBIS" },
    { label: "ZED+B-FAX", value: "ZED+B-FAX" },
    { label: "MILINIUM", value: "MILINIUM" },
    { label: "REAL GEL", value: "REAL GEL" },
    { label: "ATEASE-10", value: "ATEASE-10" },
    { label: "ASDM", value: "ASDM" },
    { label: "OPT", value: "OPT" },
    { label: "SOURCE", value: "SOURCE" },
    { label: "SEE ON", value: "SEE ON" },
    { label: "SEE MEGA", value: "SEE MEGA" },
    { label: "PROTIMES", value: "PROTIMES" },
    { label: "AKSHCARE", value: "AKSHCARE" },
    { label: "ALOTE", value: "ALOTE" },
    { label: "AYURFAX", value: "AYURFAX" },
  ]);

  // Dosage-1
  const [openDosage1, setOpenDosage1] = useState(false);
  const [valueDosage1, setValueDosage1] = useState([]);
  const [itemsDosage1, setItemsDosage1] = useState([
    { label: "1 time in a day(OD)", value: "1 time in a day(OD)" },
    { label: "2 times a day(BD)", value: "2 times a day(BD)" },
    { label: "3 times a day", value: "3 times a day" },
    { label: "4 times a day", value: "4 times a day" },
    { label: "5 times a day", value: "5 times a day" },
    { label: "Bed time", value: "Bed time" },
    {
      label: "Surgical case after every 2 hours",
      value: "Surgical case after every 2 hours",
    },
    {
      label: "Surgical case after every 4 hours",
      value: "Surgical case after every 4 hours",
    },
    {
      label: "Surgical case after every 6 hours",
      value: "Surgical case after every 6 hours",
    },
    {
      label: "Injection case after every 2 hours",
      value: "injection case after every 2 hours",
    },
    {
      label: "injection case after every 4 hours",
      value: "injection case after every 4 hours",
    },
    {
      label: "injection case after every 6 hours",
      value: "injection case after every 6 hours",
    },
    { label: "SOS", value: "SOS" },
    { label: "Other", value: "other" },
    { label: "NA", value: "NA" },
  ]);

  // treatment-2
  const [openTreatment2, setOpenTreatment2] = useState(false);
  const [valueTreatment2, setValueTreatment2] = useState([]);
  const [itemsTreatment2, setItemsTreatment2] = useState([
    { label: "OFLUS", value: "OFLUS" },
    { label: "GATFLOS", value: "GATFLOS" },
    { label: "MOFLUS-T", value: "MOFLUS-T" },
    { label: "MOFLUS", value: "MOFLUS" },
    { label: "TINIC", value: "TINIC" },
    { label: "ANANAC", value: "ANANAC" },
    { label: "KETEXO", value: "KETEXO" },
    { label: "MOFLUS-KT", value: "MOFLUS-KT" },
    { label: "OKULAC", value: "OKULAC" },
    { label: "OKULAC-D", value: "OKULAC-D" },
    { label: "OKULAC-AH", value: "OKULAC-AH" },
    { label: "ZYFLUR", value: "ZYFLUR" },
    { label: "MOFLUS-BR", value: "MOFLUS-BR" },
    { label: "OKULAC-LS", value: "OKULAC-LS" },
    { label: "GATFLOS-F", value: "GATFLOS-F" },
    { label: "ACT-ONE250", value: "ACT-ONE250" },
    { label: "TIMOLUS-BT", value: "TIMOLUS-BT" },
    { label: "GATFLOS-B", value: "GATFLOS-B" },
    { label: "HOLIF", value: "HOLIF" },
    { label: "HOLIF-T", value: "HOLIF-T" },
    { label: "MOFLUS-B", value: "MOFLUS-B" },
    { label: "OFLUS-D", value: "OFLUS-D" },
    { label: "P-REX-B", value: "P-REX-B" },
    { label: "MOFLUS-LT", value: "MOFLUS-LT" },
    { label: "LAPT", value: "LAPT" },
    { label: "PREXO", value: "PREXO" },
    { label: "MOFLUS-P", value: "MOFLUS-P" },
    { label: "MOFLUS-D", value: "MOFLUS-D" },
    { label: "HYON-C", value: "HYON-C" },
    { label: "NATOK", value: "NATOK" },
    { label: "CUCOLUS", value: "CUCOLUS" },
    { label: "PATINE", value: "PATINE" },
    { label: "PUPILOWIDE", value: "PUPILOWIDE" },
    { label: "CATLUS", value: "CATLUS" },
    { label: "STAY SOFT", value: "STAY SOFT" },
    { label: "CARMOS", value: "CARMOS" },
    { label: "CARMOS GEL", value: "CARMOS GEL" },
    { label: "CARMOS-LS", value: "CARMOS-LS" },
    { label: "CARMOS-PLUS", value: "CARMOS-PLUS" },
    { label: "H-MOS", value: "H-MOS" },
    { label: "OSS", value: "OSS" },
    { label: "LYOK-5000", value: "LYOK-5000" },
    { label: "LYOK-VIT", value: "LYOK-VIT" },
    { label: "VITLUS", value: "VITLUS" },
    { label: "LYOKPLUS", value: "LYOKPLUS" },
    { label: "SIGHTSOFT", value: "SIGHTSOFT" },
    { label: "ME9X-OD", value: "ME9X-OD" },
    { label: "AIMS", value: "AIMS" },
    { label: "AIMS-OD", value: "AIMS-OD" },
    { label: "AIMS-KT", value: "AIMS-KT" },
    { label: "HPNC", value: "HPNC" },
    { label: "HPNC PLUS", value: "HPNC PLUS" },
    { label: "ROMAG", value: "ROMAG" },
    { label: "ACLON-P", value: "ACLON-P" },
    { label: "ACLON-SP", value: "ACLON-SP" },
    { label: "ADD-5", value: "ADD-5" },
    { label: "RIOS", value: "RIOS" },
    { label: "RIOS PLUS", value: "RIOS PLUS" },
    { label: "DEFLUS-6", value: "DEFLUS-6" },
    { label: "FEXOLUS-M", value: "FEXOLUS-M" },
    { label: "GABLUS-M", value: "GABLUS-M" },
    { label: "CFDM-200", value: "CFDM-200" },
    { label: "ROXUS-150", value: "ROXUS-150" },
    { label: "DRYCURE", value: "DRYCURE" },
    { label: "DRYCURE GEL", value: "DRYCURE GEL" },
    { label: "DRYCURE ULTRA", value: "DRYCURE ULTRA" },
    { label: "MCN", value: "MCN" },
    { label: "MCN KT", value: "MCN KT" },
    { label: "NEFACURE", value: "NEFACURE" },
    { label: "KETCURE-CP", value: "KETCURE-CP" },
    { label: "FLUROCURE-T", value: "FLUROCURE-T" },
    { label: "PATACURE", value: "PATACURE" },
    { label: "CATACURE", value: "CATACURE" },
    { label: "TIMCURE", value: "TIMCURE" },
    { label: "LYCURE", value: "LYCURE" },
    { label: "FANDUS", value: "FANDUS" },
    { label: "CATASOL", value: "CATASOL" },
    { label: "HUMOX", value: "HUMOX" },
    { label: "OPTOBS", value: "OPTOBS" },
    { label: "HUCIN-P", value: "HUCIN-P" },
    { label: "TEARIN", value: "TEARIN" },
    { label: "HUNAC", value: "HUNAC" },
    { label: "HUCROM", value: "HUCROM" },
    { label: "ALTEARS", value: "ALTEARS" },
    { label: "OCLAC", value: "OCLAC" },
    { label: "DR-SONI-P", value: "DR-SONI-P" },
    { label: "FLUTON", value: "FLUTON" },
    { label: "HUMOX-K", value: "HUMOX-K" },
    { label: "VIBS", value: "VIBS" },
    { label: "HUDIN", value: "HUDIN" },
    { label: "AKXN", value: "AKXN" },
    { label: "ATPINE", value: "ATPINE" },
    { label: "B-FAX", value: "B-FAX" },
    { label: "B-MOX", value: "B-MOX" },
    { label: "CLODIL", value: "CLODIL" },
    { label: "DD", value: "DD" },
    { label: "DEPOL", value: "DEPOL" },
    { label: "FLUROM", value: "FLUROM" },
    { label: "FLUROM-T", value: "FLUROM-T" },
    { label: "GATSAR", value: "GATSAR" },
    { label: "GSP", value: "GSP" },
    { label: "GLUMA", value: "GLUMA" },
    { label: "HYLUR", value: "HYLUR" },
    { label: "I-BRO", value: "I-BRO" },
    { label: "IFAX", value: "IFAX" },
    { label: "IFAX-D", value: "IFAX-D" },
    { label: "KEMAC", value: "KEMAC" },
    { label: "KEMAC-D", value: "KEMAC-D" },
    { label: "KEMAC-M", value: "KEMAC-M" },
    { label: "LENSACT", value: "LENSACT" },
    { label: "LOTEMIL", value: "LOTEMIL" },
    { label: "MILINEUM", value: "MILINEUM" },
    { label: "MYGIC", value: "MYGIC" },
    { label: "NPF", value: "NPF" },
    { label: "NTM", value: "NTM" },
    { label: "OPEDE", value: "OPEDE" },
    { label: "PREDSAR", value: "PREDSAR" },
    { label: "PROCAINE", value: "PROCAINE" },
    { label: "POVICARE", value: "POVICARE" },
    { label: "PG-AQUA", value: "PG-AQUA" },
    { label: "REAL TEARS", value: "REAL TEARS" },
    { label: "SOCL", value: "SOCL" },
    { label: "TEARFILM", value: "TEARFILM" },
    { label: "TEARFILM GEL", value: "TEARFILM GEL" },
    { label: "TORBIS", value: "TORBIS" },
    { label: "ZED+B-FAX", value: "ZED+B-FAX" },
    { label: "MILINIUM", value: "MILINIUM" },
    { label: "REAL GEL", value: "REAL GEL" },
    { label: "ATEASE-10", value: "ATEASE-10" },
    { label: "ASDM", value: "ASDM" },
    { label: "OPT", value: "OPT" },
    { label: "SOURCE", value: "SOURCE" },
    { label: "SEE ON", value: "SEE ON" },
    { label: "SEE MEGA", value: "SEE MEGA" },
    { label: "PROTIMES", value: "PROTIMES" },
    { label: "AKSHCARE", value: "AKSHCARE" },
    { label: "ALOTE", value: "ALOTE" },
    { label: "AYURFAX", value: "AYURFAX" },
  ]);

  // Dosage-2
  const [openDosage2, setOpenDosage2] = useState(false);
  const [valueDosage2, setValueDosage2] = useState([]);
  const [itemsDosage2, setItemsDosage2] = useState([
    { label: "1 time in a day(OD)", value: "1 time in a day(OD)" },
    { label: "2 times a day(BD)", value: "2 times a day(BD)" },
    { label: "3 times a day", value: "3 times a day" },
    { label: "4 times a day", value: "4 times a day" },
    { label: "5 times a day", value: "5 times a day" },
    { label: "Bed time", value: "Bed time" },
    {
      label: "Surgical case after every 2 hours",
      value: "Surgical case after every 2 hours",
    },
    {
      label: "Surgical case after every 4 hours",
      value: "Surgical case after every 4 hours",
    },
    {
      label: "Surgical case after every 6 hours",
      value: "Surgical case after every 6 hours",
    },
    {
      label: "Injection case after every 2 hours",
      value: "injection case after every 2 hours",
    },
    {
      label: "injection case after every 4 hours",
      value: "injection case after every 4 hours",
    },
    {
      label: "injection case after every 6 hours",
      value: "injection case after every 6 hours",
    },
    { label: "SOS", value: "SOS" },
    { label: "Other", value: "other" },
    { label: "NA", value: "NA" },
  ]);

  // treatment-3
  const [openTreatment3, setOpenTreatment3] = useState(false);
  const [valueTreatment3, setValueTreatment3] = useState([]);
  const [itemsTreatment3, setItemsTreatment3] = useState([
    { label: "OFLUS", value: "OFLUS" },
    { label: "GATFLOS", value: "GATFLOS" },
    { label: "MOFLUS-T", value: "MOFLUS-T" },
    { label: "MOFLUS", value: "MOFLUS" },
    { label: "TINIC", value: "TINIC" },
    { label: "ANANAC", value: "ANANAC" },
    { label: "KETEXO", value: "KETEXO" },
    { label: "MOFLUS-KT", value: "MOFLUS-KT" },
    { label: "OKULAC", value: "OKULAC" },
    { label: "OKULAC-D", value: "OKULAC-D" },
    { label: "OKULAC-AH", value: "OKULAC-AH" },
    { label: "ZYFLUR", value: "ZYFLUR" },
    { label: "MOFLUS-BR", value: "MOFLUS-BR" },
    { label: "OKULAC-LS", value: "OKULAC-LS" },
    { label: "GATFLOS-F", value: "GATFLOS-F" },
    { label: "ACT-ONE250", value: "ACT-ONE250" },
    { label: "TIMOLUS-BT", value: "TIMOLUS-BT" },
    { label: "GATFLOS-B", value: "GATFLOS-B" },
    { label: "HOLIF", value: "HOLIF" },
    { label: "HOLIF-T", value: "HOLIF-T" },
    { label: "MOFLUS-B", value: "MOFLUS-B" },
    { label: "OFLUS-D", value: "OFLUS-D" },
    { label: "P-REX-B", value: "P-REX-B" },
    { label: "MOFLUS-LT", value: "MOFLUS-LT" },
    { label: "LAPT", value: "LAPT" },
    { label: "PREXO", value: "PREXO" },
    { label: "MOFLUS-P", value: "MOFLUS-P" },
    { label: "MOFLUS-D", value: "MOFLUS-D" },
    { label: "HYON-C", value: "HYON-C" },
    { label: "NATOK", value: "NATOK" },
    { label: "CUCOLUS", value: "CUCOLUS" },
    { label: "PATINE", value: "PATINE" },
    { label: "PUPILOWIDE", value: "PUPILOWIDE" },
    { label: "CATLUS", value: "CATLUS" },
    { label: "STAY SOFT", value: "STAY SOFT" },
    { label: "CARMOS", value: "CARMOS" },
    { label: "CARMOS GEL", value: "CARMOS GEL" },
    { label: "CARMOS-LS", value: "CARMOS-LS" },
    { label: "CARMOS-PLUS", value: "CARMOS-PLUS" },
    { label: "H-MOS", value: "H-MOS" },
    { label: "OSS", value: "OSS" },
    { label: "LYOK-5000", value: "LYOK-5000" },
    { label: "LYOK-VIT", value: "LYOK-VIT" },
    { label: "VITLUS", value: "VITLUS" },
    { label: "LYOKPLUS", value: "LYOKPLUS" },
    { label: "SIGHTSOFT", value: "SIGHTSOFT" },
    { label: "ME9X-OD", value: "ME9X-OD" },
    { label: "AIMS", value: "AIMS" },
    { label: "AIMS-OD", value: "AIMS-OD" },
    { label: "AIMS-KT", value: "AIMS-KT" },
    { label: "HPNC", value: "HPNC" },
    { label: "HPNC PLUS", value: "HPNC PLUS" },
    { label: "ROMAG", value: "ROMAG" },
    { label: "ACLON-P", value: "ACLON-P" },
    { label: "ACLON-SP", value: "ACLON-SP" },
    { label: "ADD-5", value: "ADD-5" },
    { label: "RIOS", value: "RIOS" },
    { label: "RIOS PLUS", value: "RIOS PLUS" },
    { label: "DEFLUS-6", value: "DEFLUS-6" },
    { label: "FEXOLUS-M", value: "FEXOLUS-M" },
    { label: "GABLUS-M", value: "GABLUS-M" },
    { label: "CFDM-200", value: "CFDM-200" },
    { label: "ROXUS-150", value: "ROXUS-150" },
    { label: "DRYCURE", value: "DRYCURE" },
    { label: "DRYCURE GEL", value: "DRYCURE GEL" },
    { label: "DRYCURE ULTRA", value: "DRYCURE ULTRA" },
    { label: "MCN", value: "MCN" },
    { label: "MCN KT", value: "MCN KT" },
    { label: "NEFACURE", value: "NEFACURE" },
    { label: "KETCURE-CP", value: "KETCURE-CP" },
    { label: "FLUROCURE-T", value: "FLUROCURE-T" },
    { label: "PATACURE", value: "PATACURE" },
    { label: "CATACURE", value: "CATACURE" },
    { label: "TIMCURE", value: "TIMCURE" },
    { label: "LYCURE", value: "LYCURE" },
    { label: "FANDUS", value: "FANDUS" },
    { label: "CATASOL", value: "CATASOL" },
    { label: "HUMOX", value: "HUMOX" },
    { label: "OPTOBS", value: "OPTOBS" },
    { label: "HUCIN-P", value: "HUCIN-P" },
    { label: "TEARIN", value: "TEARIN" },
    { label: "HUNAC", value: "HUNAC" },
    { label: "HUCROM", value: "HUCROM" },
    { label: "ALTEARS", value: "ALTEARS" },
    { label: "OCLAC", value: "OCLAC" },
    { label: "DR-SONI-P", value: "DR-SONI-P" },
    { label: "FLUTON", value: "FLUTON" },
    { label: "HUMOX-K", value: "HUMOX-K" },
    { label: "VIBS", value: "VIBS" },
    { label: "HUDIN", value: "HUDIN" },
    { label: "AKXN", value: "AKXN" },
    { label: "ATPINE", value: "ATPINE" },
    { label: "B-FAX", value: "B-FAX" },
    { label: "B-MOX", value: "B-MOX" },
    { label: "CLODIL", value: "CLODIL" },
    { label: "DD", value: "DD" },
    { label: "DEPOL", value: "DEPOL" },
    { label: "FLUROM", value: "FLUROM" },
    { label: "FLUROM-T", value: "FLUROM-T" },
    { label: "GATSAR", value: "GATSAR" },
    { label: "GSP", value: "GSP" },
    { label: "GLUMA", value: "GLUMA" },
    { label: "HYLUR", value: "HYLUR" },
    { label: "I-BRO", value: "I-BRO" },
    { label: "IFAX", value: "IFAX" },
    { label: "IFAX-D", value: "IFAX-D" },
    { label: "KEMAC", value: "KEMAC" },
    { label: "KEMAC-D", value: "KEMAC-D" },
    { label: "KEMAC-M", value: "KEMAC-M" },
    { label: "LENSACT", value: "LENSACT" },
    { label: "LOTEMIL", value: "LOTEMIL" },
    { label: "MILINEUM", value: "MILINEUM" },
    { label: "MYGIC", value: "MYGIC" },
    { label: "NPF", value: "NPF" },
    { label: "NTM", value: "NTM" },
    { label: "OPEDE", value: "OPEDE" },
    { label: "PREDSAR", value: "PREDSAR" },
    { label: "PROCAINE", value: "PROCAINE" },
    { label: "POVICARE", value: "POVICARE" },
    { label: "PG-AQUA", value: "PG-AQUA" },
    { label: "REAL TEARS", value: "REAL TEARS" },
    { label: "SOCL", value: "SOCL" },
    { label: "TEARFILM", value: "TEARFILM" },
    { label: "TEARFILM GEL", value: "TEARFILM GEL" },
    { label: "TORBIS", value: "TORBIS" },
    { label: "ZED+B-FAX", value: "ZED+B-FAX" },
    { label: "MILINIUM", value: "MILINIUM" },
    { label: "REAL GEL", value: "REAL GEL" },
    { label: "ATEASE-10", value: "ATEASE-10" },
    { label: "ASDM", value: "ASDM" },
    { label: "OPT", value: "OPT" },
    { label: "SOURCE", value: "SOURCE" },
    { label: "SEE ON", value: "SEE ON" },
    { label: "SEE MEGA", value: "SEE MEGA" },
    { label: "PROTIMES", value: "PROTIMES" },
    { label: "AKSHCARE", value: "AKSHCARE" },
    { label: "ALOTE", value: "ALOTE" },
    { label: "AYURFAX", value: "AYURFAX" },
  ]);

  // Dosage-3
  const [openDosage3, setOpenDosage3] = useState(false);
  const [valueDosage3, setValueDosage3] = useState([]);
  const [itemsDosage3, setItemsDosage3] = useState([
    { label: "1 time in a day(OD)", value: "1 time in a day(OD)" },
    { label: "2 times a day(BD)", value: "2 times a day(BD)" },
    { label: "3 times a day", value: "3 times a day" },
    { label: "4 times a day", value: "4 times a day" },
    { label: "5 times a day", value: "5 times a day" },
    { label: "Bed time", value: "Bed time" },
    {
      label: "Surgical case after every 2 hours",
      value: "Surgical case after every 2 hours",
    },
    {
      label: "Surgical case after every 4 hours",
      value: "Surgical case after every 4 hours",
    },
    {
      label: "Surgical case after every 6 hours",
      value: "Surgical case after every 6 hours",
    },
    {
      label: "Injection case after every 2 hours",
      value: "injection case after every 2 hours",
    },
    {
      label: "injection case after every 4 hours",
      value: "injection case after every 4 hours",
    },

    {
      label: "injection case after every 6 hours",
      value: "injection case after every 6 hours",
    },
    { label: "SOS", value: "SOS" },
    { label: "Other", value: "other" },
    { label: "NA", value: "NA" },
  ]);

  const onOpen = useCallback(() => {
    setOpenCO(false);
    setOpenDiagnosis(false);
    setOpenTreatment1(false);
    setOpenDosage1(false);
    setOpenTreatment2(false);
    setOpenDosage2(false);
    setOpenTreatment3(false);
    setOpenDosage3(false);
  }, []);

  const onOpenCO = useCallback(() => {
    setOpen(false);
    setOpenDiagnosis(false);
    setOpenTreatment1(false);
    setOpenDosage1(false);
    setOpenTreatment2(false);
    setOpenDosage2(false);
    setOpenTreatment3(false);
    setOpenDosage3(false);
  }, []);

  const onOpenDiagnosis = useCallback(() => {
    setOpen(false);
    setOpenCO(false);
    setOpenTreatment1(false);
    setOpenDosage1(false);
    setOpenTreatment2(false);
    setOpenDosage2(false);
    setOpenTreatment3(false);
    setOpenDosage3(false);
  }, []);
  const onOpenTreatment1 = useCallback(() => {
    setOpen(false);
    setOpenCO(false);
    setOpenDiagnosis(false);
    setOpenDosage1(false);
    setOpenTreatment2(false);
    setOpenDosage2(false);
    setOpenTreatment3(false);
    setOpenDosage3(false);
  }, []);
  const onOpenDosage1 = useCallback(() => {
    setOpen(false);
    setOpenCO(false);
    setOpenDiagnosis(false);
    setOpenTreatment1(false);
    setOpenTreatment2(false);
    setOpenDosage2(false);
    setOpenTreatment3(false);
    setOpenDosage3(false);
  }, []);
  const onOpenTreatment2 = useCallback(() => {
    setOpen(false);
    setOpenCO(false);
    setOpenDiagnosis(false);
    setOpenDosage1(false);
    setOpenTreatment1(false);
    setOpenDosage2(false);
    setOpenTreatment3(false);
    setOpenDosage3(false);
  }, []);
  const onOpenDosage2 = useCallback(() => {
    setOpen(false);
    setOpenCO(false);
    setOpenDiagnosis(false);
    setOpenTreatment1(false);
    setOpenTreatment2(false);
    setOpenDosage1(false);
    setOpenTreatment3(false);
    setOpenDosage3(false);
  }, []);
  const onOpenTreatment3 = useCallback(() => {
    setOpen(false);
    setOpenCO(false);
    setOpenDiagnosis(false);
    setOpenDosage1(false);
    setOpenTreatment1(false);
    setOpenDosage2(false);
    setOpenTreatment2(false);
    setOpenDosage3(false);
  }, []);
  const onOpenDosage3 = useCallback(() => {
    setOpen(false);
    setOpenCO(false);
    setOpenDiagnosis(false);
    setOpenTreatment1(false);
    setOpenTreatment2(false);
    setOpenDosage1(false);
    setOpenTreatment3(false);
    setOpenDosage2(false);
  }, []);

  function addPatient() {
    if (Id == "" || Name == "" || userPhone == "") {
      Alert.alert("Error", "ID,Name or Phone Number cannot be blank.", [
        { text: "OK" },
      ]);
    } else {
      if (Id !== "") {
        var ref = firebase.database().ref("patientInfo");
        ref.once("value").then(function (snapshot) {
          var b = snapshot.child(Id).exists();
          if (b) {
            Alert.alert("Alert", "Patient Id already exists.", [
              { text: "OK" },
            ]);
          } else {
            const patientInfo = firebase.database().ref("patientInfo");
            patientInfo.child(Id).set({
              patientName: Name,
              id: Id,
              phoneNumber: userPhone,
              address: userAddress,
              age: userAge,
              visitDate: visitDate,
              Gender: userGender,
              Email: email,
              Suggestion:suggestion,
              history: value,
              CO: valueCO,
              Diagnosis: valueDiagnosis,
              treatment1: valueTreatment1,
              dosage1: valueDosage1,
              treatment2: valueTreatment2,
              dosage2: valueDosage2,
              treatment3: valueTreatment3,
              dosage3: valueDosage3,
            });
            Alert.alert("Success", "Patient Added Successfully.", [
              { text: "OK" },
            ]);
            navigation.navigate("Home");
          }
        });
      }
    }
  }

  const [Id, setId] = useState("");

  function check() {
    if (Id !== "") {
      var ref = firebase.database().ref("patientInfo");
      ref.once("value").then(function (snapshot) {
        var b = snapshot.child(Id).exists();
        if (b) {
          Alert.alert("Alert", "Patient Id already exists.", [{ text: "OK" }]);
        } else {
          Alert.alert("Success", "Patient Id Available.", [{ text: "OK" }]);
        }
      });
    }
  }
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          width: win.width,
          resizeMode: "contain",
          position: "absolute",
          top: -10,
        }}
        source={require("../assets/images/topbackground.png")}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon
            name="arrow-left"
            type="font-awesome-5"
            color="white"
            style={styles.back}
            size={30}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Add Patient</Text>
        <TouchableOpacity
          onPress={() => addPatient()}
          // onPressIn={() => navigation.navigate("Home")}
        >
          <Text style={styles.save}>Add</Text>
        </TouchableOpacity>
      </View>

      <Card style={styles.card}>
        <KeyboardAwareScrollView enableOnAndroid={true}>
          <Text style={styles.category}>General Details</Text>
          <TextInput
            label="Name"
            value={Name}
            onChangeText={(text) => setName(text)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon name="shield-account-outline" color="grey" />}
          />
          <TextInput
            label="Patient Id"
            keyboardType="number-pad"
            value={Id}
            onChangeText={(text) => setId(text)}
            // onSubmitEditing={() => check()}
            mode="outlined"
            style={styles.input}
            left={
                  <TextInput.Icon
                    name="card-account-details-outline"
                    color="grey"
                  />
                }
          />
          <Button
            onPress={() => {
              check();
            }}
            icon="account-search"
            mode="contained"
            style={styles.button}
          >
            Check ID
          </Button>
          <TextInput
            label="Phone Number"
            value={userPhone}
            onChangeText={(text) => setUserPhone(text)}
            mode="outlined"
            style={styles.input}
            keyboardType="number-pad"
            left={<TextInput.Icon name="cellphone-basic" color="grey" />}
          />
          <TextInput
            label="Address"
            value={userAddress}
            onChangeText={(text) => setUserAddress(text)}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon name="map-marker-radius-outline" color="grey" />}
          />
          <TextInput
            label="Age"
            value={userAge}
            onChangeText={(text) => setUserAge(text)}
            mode="outlined"
            style={styles.input}
            keyboardType="number-pad"
          />
          <TextInput
            label="Date of Visit (DD/MM/YYYY)"
            value={visitDate}
            onChangeText={(text) => setVisitDate(text)}
            mode="outlined"
            style={styles.input}
            left={
                  <TextInput.Icon name="calendar-month-outline" color="grey" />
                }
              
          />
          <TextInput
            label="Gender"
            value={userGender}
            onChangeText={(text) => setUserGender(text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
            style={styles.input}
            left={
                  <TextInput.Icon name="email-open-outline" color="grey" />
                }
          />
          <Text style={styles.category}>Medical Details</Text>
          <Text style={styles.subheading}>Patient History</Text>
          <DropDownPicker
            multiple={true}
            open={open}
            onOpen={onOpen}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Choose"
            placeholderStyle={{
              color: "#878787",
            }}
            dropDownContainerStyle={{
              borderColor: "#878787",
            }}
            searchContainerStyle={{
              borderBottomColor: "#878787",
            }}
            badgeColors={"white"}
            badgeDotColors={"red"}
            searchable={true}
            listMode="SCROLLVIEW"
            mode="BADGE"
            style={styles.dropdown}
            zIndex={3000}
          />

          <Text style={styles.subheading}>C/O</Text>
          <DropDownPicker
            multiple={true}
            open={openCO}
            onOpen={onOpenCO}
            value={valueCO}
            items={itemsCO}
            setOpen={setOpenCO}
            setValue={setValueCO}
            setItems={setItemsCO}
            placeholder="Choose"
            placeholderStyle={{
              color: "#878787",
            }}
            dropDownContainerStyle={{
              borderColor: "#878787",
            }}
            searchContainerStyle={{
              borderBottomColor: "#878787",
            }}
            badgeColors={"white"}
            badgeDotColors={"blue"}
            searchable={true}
            listMode="SCROLLVIEW"
            mode="BADGE"
            style={styles.dropdown}
            zIndex={2000}
          />
          <Text style={styles.subheading}>Diagnosis</Text>
          <DropDownPicker
            multiple={true}
            open={openDiagnosis}
            onOpen={onOpenDiagnosis}
            value={valueDiagnosis}
            items={itemsDiagnosis}
            setOpen={setOpenDiagnosis}
            setValue={setValueDiagnosis}
            setItems={setItemsDiagnosis}
            placeholder="Choose"
            placeholderStyle={{
              color: "#878787",
            }}
            dropDownContainerStyle={{
              borderColor: "#878787",
            }}
            searchContainerStyle={{
              borderBottomColor: "#878787",
            }}
            badgeColors={"white"}
            badgeDotColors={"green"}
            searchable={true}
            listMode="SCROLLVIEW"
            mode="BADGE"
            style={styles.dropdown}
            zIndex={1000}
          />
          <Text style={styles.subheading}>Treatment-1</Text>
          <DropDownPicker
            multiple={true}
            open={openTreatment1}
            onOpen={onOpenTreatment1}
            value={valueTreatment1}
            items={itemsTreatment1}
            setOpen={setOpenTreatment1}
            setValue={setValueTreatment1}
            setItems={setItemsTreatment1}
            placeholder="Choose"
            placeholderStyle={{
              color: "#878787",
            }}
            dropDownContainerStyle={{
              borderColor: "#878787",
            }}
            searchContainerStyle={{
              borderBottomColor: "#878787",
            }}
            badgeColors={"white"}
            badgeDotColors={"#ba5f04"}
            searchable={true}
            listMode="SCROLLVIEW"
            mode="BADGE"
            style={styles.dropdown}
            zIndex={900}
          />
          <Text style={styles.subheading2}>Dosage-1</Text>
          <DropDownPicker
            multiple={true}
            open={openDosage1}
            onOpen={onOpenDosage1}
            value={valueDosage1}
            items={itemsDosage1}
            setOpen={setOpenDosage1}
            setValue={setValueDosage1}
            setItems={setItemsDosage1}
            placeholder="Choose"
            placeholderStyle={{
              color: "#878787",
            }}
            dropDownContainerStyle={{
              borderColor: "#878787",
            }}
            searchContainerStyle={{
              borderBottomColor: "#878787",
            }}
            badgeColors={"white"}
            badgeDotColors={"#005c75"}
            searchable={true}
            listMode="SCROLLVIEW"
            mode="BADGE"
            style={styles.dropdown}
            zIndex={800}
          />
          <Text style={styles.subheading}>Treatment-2</Text>
          <DropDownPicker
            multiple={true}
            open={openTreatment2}
            onOpen={onOpenTreatment2}
            value={valueTreatment2}
            items={itemsTreatment2}
            setOpen={setOpenTreatment2}
            setValue={setValueTreatment2}
            setItems={setItemsTreatment2}
            placeholder="Choose"
            placeholderStyle={{
              color: "#878787",
            }}
            dropDownContainerStyle={{
              borderColor: "#878787",
            }}
            searchContainerStyle={{
              borderBottomColor: "#878787",
            }}
            badgeColors={"white"}
            badgeDotColors={"#ba5f04"}
            searchable={true}
            listMode="SCROLLVIEW"
            mode="BADGE"
            style={styles.dropdown}
            zIndex={700}
          />
          <Text style={styles.subheading2}>Dosage-2</Text>
          <DropDownPicker
            multiple={true}
            open={openDosage2}
            onOpen={onOpenDosage2}
            value={valueDosage2}
            items={itemsDosage2}
            setOpen={setOpenDosage2}
            setValue={setValueDosage2}
            setItems={setItemsDosage2}
            placeholder="Choose"
            placeholderStyle={{
              color: "#878787",
            }}
            dropDownContainerStyle={{
              borderColor: "#878787",
            }}
            searchContainerStyle={{
              borderBottomColor: "#878787",
            }}
            badgeColors={"white"}
            badgeDotColors={"#005c75"}
            searchable={true}
            listMode="SCROLLVIEW"
            mode="BADGE"
            style={styles.dropdown}
            zIndex={600}
          />
          <Text style={styles.subheading}>Treatment-3</Text>
          <DropDownPicker
            multiple={true}
            open={openTreatment3}
            onOpen={onOpenTreatment3}
            value={valueTreatment3}
            items={itemsTreatment3}
            setOpen={setOpenTreatment3}
            setValue={setValueTreatment3}
            setItems={setItemsTreatment3}
            placeholder="Choose"
            placeholderStyle={{
              color: "#878787",
            }}
            dropDownContainerStyle={{
              borderColor: "#878787",
            }}
            searchContainerStyle={{
              borderBottomColor: "#878787",
            }}
            badgeColors={"white"}
            badgeDotColors={"#ba5f04"}
            searchable={true}
            listMode="SCROLLVIEW"
            mode="BADGE"
            style={styles.dropdown}
            zIndex={500}
          />
          <Text style={styles.subheading2}>Dosage-3</Text>
          <DropDownPicker
            multiple={true}
            open={openDosage3}
            onOpen={onOpenDosage3}
            value={valueDosage3}
            items={itemsDosage3}
            setOpen={setOpenDosage3}
            setValue={setValueDosage3}
            setItems={setItemsDosage3}
            placeholder="Choose"
            placeholderStyle={{
              color: "#878787",
            }}
            dropDownContainerStyle={{
              borderColor: "#878787",
            }}
            searchContainerStyle={{
              borderBottomColor: "#878787",
            }}
            badgeColors={"white"}
            badgeDotColors={"#005c75"}
            searchable={true}
            listMode="SCROLLVIEW"
            mode="BADGE"
            style={styles.dropdown}
            zIndex={400}
          />
          <TextInput
            label="Suggestion"
            value={suggestion}
            onChangeText={(text) => setSuggestion(text)}
            mode="outlined"
            style={styles.input}
          />
        </KeyboardAwareScrollView>
      </Card>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
  },
  text: {
    fontSize: 50,
  },

  header: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: 50,
    alignItems: "center",
  },
  heading: {
    fontSize: 32,
    color: "white",
    marginLeft: 40,
    marginRight: 30,
  },
  save: {
    color: "white",
    fontSize: 20,
  },
  card: {
    width: "90%",
    borderRadius: 20,
    position: "absolute",
    top: 170,
    padding: 15,
    height: 500,
  },
  input: {
    margin: 15,
    marginTop: 10,
    backgroundColor: "#f0f0f0",
  },
  dropdown: {
    margin: 15,
    marginTop: 10,
    width: 265,
    backgroundColor: "#f0f0f0",
    height: 60,
    borderColor: "#878787",
  },
  button: {
    width: 130,
    marginLeft: 80,
    // padding: 5,
    // marginTop: 20,
    // marginBottom: 30,
  },
  subheading: {
    marginLeft: 20,
    color: "red",
    fontSize: 17,
  },
  subheading2: {
    marginLeft: 20,
    fontSize: 17,
  },
  category: {
    marginLeft: 20,
    fontSize: 25,
    color: "#280080",
  },
});

export default addPatientPage;
