import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect ,useCallback} from "react";
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
} from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import { Icon, SocialIcon, ListItem, Avatar } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DropDownPicker from "react-native-dropdown-picker";
import * as firebase from "firebase";

const addPatientPage = ({ navigation, route }) => {
  const win = Dimensions.get("window");
  const {
    patientgender,
    address,
    age,
    patientId,
    name,
    phoneNumber,
    visitDate,
    email,
    history,
    CO,
    diagnosis,
    treatment1,
    dosage1,
    treatment2,
    dosage2,
    treatment3,
    dosage3,
    doctorSuggestion,
  } = route.params;
  const [Name, setName] = useState(name);
  const [Id, setId] = useState(patientId);
  const [userPhone, setUserPhone] = useState(phoneNumber);
  const [userAddress, setUserAddress] = useState(address);
  const [userAge, setUserAge] = useState(age);
  const [patientvisitDate, setVisitDate] = useState(visitDate);
  const [userGender, setUserGender] = useState(patientgender);
  const [patientEmail, setEmail] = useState(email);
  const [History, setHistory] = useState(history);
  const [co, setCO] = useState(CO);
  const [Diagnosis, setDiagnosis] = useState(diagnosis);
  const [Treatment1, setTreatment1] = useState(treatment1);
  const [Dosage1, setDosage1] = useState(dosage1);
  const [Treatment2, setTreatment2] = useState(treatment2);
  const [Dosage2, setDosage2] = useState(dosage2);
  const [Treatment3, setTreatment3] = useState(treatment3);
  const [Dosage3, setDosage3] = useState(dosage3);
  const [Suggestion, setSuggestion] = useState(doctorSuggestion);

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

  function editData() {
    const patientInfo = firebase.database().ref("patientInfo");
    patientInfo.child(Id).update({
      patientName: Name,
      id: Id,
      phoneNumber: userPhone,
      address: userAddress,
      age: userAge,
      visitDate: patientvisitDate,
      Gender: userGender,
      Email: patientEmail,
      Suggestion:Suggestion,
      // history:History,
      // CO: co,
      // Diagnosis: Diagnosis,
      // treatment1: Treatment1,
      // dosage1: Dosage1,
      // treatment2: Treatment2,
      // dosage2: Dosage2,
      // treatment3: Treatment3,
      // dosage3: Dosage3,
    });
    // if (value == []) {
    //   const patientInfo = firebase.database().ref("patientInfo");
    //   patientInfo.child(Id).child(history).set({
    //     history: History,
    //   });
    // } 
    if (value !== []) {
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).update({
        history: value,
      });
    }
      if(value.length==0){
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).update({
        history: History,
      });
    }
    // if (valueCO == []) {
    //   const patientInfo = firebase.database().ref("patientInfo");
    //   patientInfo.child(Id).child(CO).set({
    //     CO: co,
    //   });
    // }
    if (valueCO !== []) {
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).update({
        CO: valueCO,
      });
    }
    if(valueCO.length==0){
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).update({
        CO: co,
      });
    }
    // if (valueDiagnosis == []) {
    //   const patientInfo = firebase.database().ref("patientInfo");
    //   patientInfo.child(Id).child(Diagnosis).set({
    //     Diagnosis: Diagnosis,
    //   });
    // }
    if (valueDiagnosis !== []) {
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).update({
        Diagnosis: valueDiagnosis,
      });
    }
    if(valueDiagnosis.length==0){
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).update({
        Diagnosis: Diagnosis,
      });
    }
    
    // if (valueTreatment1 == []) {
    //   const patientInfo = firebase.database().ref("patientInfo");
    //   patientInfo.child(Id).child(treatment1).set({
    //     treatment1: Treatment1,
    //   });
    // }
    if (valueTreatment1 !== []) {
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).update({
        treatment1: valueTreatment1,
      });
    }
    if(valueTreatment1.length==0){
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).update({
        treatment1: Treatment1,
      });
    }
    // if (valueDosage1 == []) {
    //   const patientInfo = firebase.database().ref("patientInfo");
    //   patientInfo.child(Id).child(dosage1).set({
    //     dosage1: Dosage1,
    //   });
    // }
    if (valueDosage1 !== []) {
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).update({
        dosage1: valueDosage1,
      });
    }
    if(valueDosage1.length==0){
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).update({
        dosage1: Dosage1,
      });
    }
    // if (valueTreatment2 == []) {
    //   const patientInfo = firebase.database().ref("patientInfo");
    //   patientInfo.child(Id).child(treatment2).set({
    //     treatment2: Treatment2,
    //   });
    // }
    if (valueTreatment2 !== []) {
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).update({
        treatment2: valueTreatment2,
      });
    }
    if(valueTreatment2.length==0){
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).update({
        treatment2: Treatment2,
      });
    }
    // if (valueDosage2 == []) {
    //   const patientInfo = firebase.database().ref("patientInfo");
    //   patientInfo.child(Id).child(dosage2).set({
    //     dosage2: Dosage2,
    //   });
    // }
    if (valueDosage2 !== []) {
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).update({
        dosage2: valueDosage2,
      });
    }
    if(valueDosage2.length==0){
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).update({
        dosage2: Dosage2,
      });
    }
    // if (valueTreatment3 == []) {
    //   const patientInfo = firebase.database().ref("patientInfo");
    //   patientInfo.child(Id).child(treatment3).set({
    //     treatment3: Treatment3,
    //   });
    // }
    if (valueTreatment3 !== []) {
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).update({
        treatment3: valueTreatment3,
      });
    }
    if(valueTreatment3.length==0){
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).update({
        treatment3: Treatment3,
      });
    }
    // if (valueDosage3 == []) {
    //   const patientInfo = firebase.database().ref("patientInfo");
    //   patientInfo.child(Id).child(dosage3).set({
    //     dosage3: Dosage3,
    //   });
    // }
    if (valueDosage3 !== []) {
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).update({
        dosage3: valueDosage3,
      });
    }
    if(valueDosage3.length==0){
      const patientInfo = firebase.database().ref("patientInfo");
      patientInfo.child(Id).update({
        dosage3: Dosage3,
      });
    }
    Alert.alert("Success", "Details Updated Succesfully", [{ text: "OK" }]);
    navigation.navigate("Home");
  }

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
        <TouchableOpacity onPress={() => navigation.navigate("patientDetails")}>
          <Icon
            name="arrow-left"
            type="font-awesome-5"
            color="white"
            style={styles.back}
            size={30}
          />
        </TouchableOpacity>

        <Text style={styles.heading}>edit details</Text>
        <TouchableOpacity onPress={() => editData()}>
          <Text style={styles.save}>save</Text>
        </TouchableOpacity>
      </View>

      <Card style={styles.card}>
        <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={200}>
          <Text style={styles.detailsText}>Personal Details</Text>
          <TextInput
            label="Name"
            value={Name}
            onChangeText={(text) => setName(text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Patient Id"
            keyboardType="number-pad"
            value={Id}
            onChangeText={(text) => setId(text)}
            mode="outlined"
            style={styles.input}
            editable={false}
          />
          <TextInput
            label="Phone Number"
            value={userPhone}
            onChangeText={(text) => setUserPhone(text)}
            mode="outlined"
            style={styles.input}
            keyboardType="number-pad"
          />
          <TextInput
            label="Address"
            value={userAddress}
            onChangeText={(text) => setUserAddress(text)}
            mode="outlined"
            style={styles.input}
            multiline={true}
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
            value={patientvisitDate}
            onChangeText={(text) => setVisitDate(text)}
            mode="outlined"
            style={styles.input}
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
            value={patientEmail}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
            style={styles.input}
          />
          <Text style={styles.detailsText}>Medical Details</Text>
          <Text style={styles.subheading}>Patient History</Text>
          <TextInput
          placeholder="Patient History"
            value={History}
            onChangeText={(text) => setHistory(text)}
            mode="outlined"
            style={styles.input1}
            multiline={true}
            editable={false}
          />
          
          <DropDownPicker
            multiple={true}
            open={open}
            onOpen={onOpen}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Edit Patient History"
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
          <TextInput
          placeholder="C/O"
            value={co}
            onChangeText={(text) => setCO(text)}
            mode="outlined"
            style={styles.input1}
            multiline={true}
            editable={false}
          />
          <DropDownPicker
            multiple={true}
            open={openCO}
            onOpen={onOpenCO}
            value={valueCO}
            items={itemsCO}
            setOpen={setOpenCO}
            setValue={setValueCO}
            setItems={setItemsCO}
            placeholder="Edit C/O"
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
          <TextInput
          placeholder="Diagnosis"
            value={Diagnosis}
            onChangeText={(text) => setDiagnosis(text)}
            mode="outlined"
            style={styles.input1}
            multiline={true}
            editable={false}
          />
          
          <DropDownPicker
            multiple={true}
            open={openDiagnosis}
            onOpen={onOpenDiagnosis}
            value={valueDiagnosis}
            items={itemsDiagnosis}
            setOpen={setOpenDiagnosis}
            setValue={setValueDiagnosis}
            setItems={setItemsDiagnosis}
            placeholder="Edit Diagnosis"
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
          <TextInput
          placeholder="Treatment-1"
            value={Treatment1}
            onChangeText={(text) => setTreatment1(text)}
            mode="outlined"
            style={styles.input1}
            multiline={true}
            editable={false}
          />
          
          <DropDownPicker
            multiple={true}
            open={openTreatment1}
            onOpen={onOpenTreatment1}
            value={valueTreatment1}
            items={itemsTreatment1}
            setOpen={setOpenTreatment1}
            setValue={setValueTreatment1}
            setItems={setItemsTreatment1}
            placeholder="Edit Treatment-1"
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
          <Text style={styles.subheading}>Dosage-1</Text>
          <TextInput
          placeholder="Dosage-1"
            value={Dosage1}
            onChangeText={(text) => setDosage1(text)}
            mode="outlined"
            style={styles.input1}
            multiline={true}
            editable={false}
          />
          
          <DropDownPicker
            multiple={true}
            open={openDosage1}
            onOpen={onOpenDosage1}
            value={valueDosage1}
            items={itemsDosage1}
            setOpen={setOpenDosage1}
            setValue={setValueDosage1}
            setItems={setItemsDosage1}
            placeholder="Edit Dosage-1"
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
          <TextInput
          placeholder="Treatment-2"
            value={Treatment2}
            onChangeText={(text) => setTreatment2(text)}
            mode="outlined"
            style={styles.input1}
            multiline={true}
            editable={false}
          />
           
          <DropDownPicker
            multiple={true}
            open={openTreatment2}
            onOpen={onOpenTreatment2}
            value={valueTreatment2}
            items={itemsTreatment2}
            setOpen={setOpenTreatment2}
            setValue={setValueTreatment2}
            setItems={setItemsTreatment2}
            placeholder="Edit Treatment-2"
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
           <Text style={styles.subheading}>Dosage-2</Text>
          <TextInput
          placeholder="Dosage-2"
            value={Dosage2}
            onChangeText={(text) => setDosage2(text)}
            mode="outlined"
            style={styles.input1}
            multiline={true}
            editable={false}
          />
          
          <DropDownPicker
            multiple={true}
            open={openDosage2}
            onOpen={onOpenDosage2}
            value={valueDosage2}
            items={itemsDosage2}
            setOpen={setOpenDosage2}
            setValue={setValueDosage2}
            setItems={setItemsDosage2}
            placeholder="Edit Dosage-2"
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
          <TextInput
          placeholder="Treatment-3"
            value={Treatment3}
            onChangeText={(text) => setTreatment3(text)}
            mode="outlined"
            style={styles.input1}
            multiline={true}
            editable={false}
          />

          <DropDownPicker
            multiple={true}
            open={openTreatment3}
            onOpen={onOpenTreatment3}
            value={valueTreatment3}
            items={itemsTreatment3}
            setOpen={setOpenTreatment3}
            setValue={setValueTreatment3}
            setItems={setItemsTreatment3}
            placeholder="Edit Treatment-3"
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
          <Text style={styles.subheading}>Dosage-3</Text>
          <TextInput
            placeholder="Dosage-3"
            value={Dosage3}
            onChangeText={(text) => setDosage3(text)}
            mode="outlined"
            style={styles.input1}
            multiline={true}
            editable={false}
          />
           
          <DropDownPicker
            multiple={true}
            open={openDosage3}
            onOpen={onOpenDosage3}
            value={valueDosage3}
            items={itemsDosage3}
            setOpen={setOpenDosage3}
            setValue={setValueDosage3}
            setItems={setItemsDosage3}
            placeholder="Edit Dosage-3"
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
            value={Suggestion}
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
    top: 160,
    padding: 15,
    paddingBottom: 25,
    height: 460,
  },
  input: {
    marginTop: 20,
  },
  input1: {
    marginTop: 4,
  },
  detailsText: {
    fontFamily: "Salsa-Regular",
    fontSize: 25,
    lineHeight: 31,
    color: "red",
    marginTop: "7%",
    marginBottom: "2%",
  },
  subheading: {
    color: "red",
    fontSize: 17,
    marginTop:15,
  },
  dropdown: {
    marginTop: 15,
    backgroundColor: "#f0f0f0",
    height: 60,
    borderColor: "#878787",
    marginBottom: 15,
  },

});

export default addPatientPage;
