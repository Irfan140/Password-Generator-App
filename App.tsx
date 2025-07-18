import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import  BouncyCheckbox  from 'react-native-bouncy-checkbox';
import { Formik } from 'formik';

// Form Validation
import * as Yup from 'yup'; // import everything (without destructuring)

const PasswordSchema = Yup.object().shape({
  // Define our properties on which we will be validating
  passwordLength: Yup.number()
    .min(4, 'Should be minimum of 4 character')
    .max(25, 'Should be maximum of 25 character')
    .required('Length is required'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);

  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setupperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (numbers) {
      characterList += digitChars;
    }
    if (symbols) {
      characterList += specialChars;
    }

    const passwordResult = createPassword(characterList, passwordLength);

    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  // Important concept
  const resetPasswordState = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(true);
    setupperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  // To ensure it doesnot give emty password when all are unchecked
  const isAnyCheckboxChecked = lowerCase || upperCase || numbers || symbols

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>

          <Formik

          // initialValues of what i want to track of
            initialValues={{ passwordLength: '' }}

            // validation (we already have our schema so no need to manullay validate)
            validationSchema={PasswordSchema}

            // values that will be coming to me from the form (from user)
            onSubmit={values => {
              console.log(values);
              // values is an object 
              // generatePasswordString is accepting a number so use + so it converts into number
              generatePasswordString(+values.passwordLength);
            }}
          >


            {({
              // These are event handlers given to us by formik
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
              
            }) => (
              <>
                <View style={styles.inputWrapper}>

                  <View style={styles.inputColumn}>

                    <Text style={styles.heading}>Password Length</Text>

                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}

                  </View>

                  <TextInput

                    style={styles.inputStyle}
                    // i am tracking passwordLength input field using formik
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}

                    placeholder="Ex. 8"
                    keyboardType="numeric"

                  />


                </View>


                <View style={styles.inputWrapper}>

                  <Text style={styles.heading}>Include lowercase</Text>
                  <BouncyCheckbox
                    
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)} // toggle the state
                    fillColor="#1ad19dff"
                  />

                </View>


                <View style={styles.inputWrapper}>

                  <Text style={styles.heading}>Include Uppercase letters</Text>
                  <BouncyCheckbox
                    
                    isChecked={upperCase}
                    onPress={() => setupperCase(!upperCase)}
                    fillColor="#FED85D"
                  />
                </View>


                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#C9A0DC"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#FC80A5"
                  />
                </View>
                <View style={styles.formActions}>

                

                  <TouchableOpacity
                  // To ensure it doesnot give emty password when all  are unchecked
                    disabled={!isValid || !isAnyCheckboxChecked}
                    style={styles.primaryBtn}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>



                  <TouchableOpacity

                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}
                  >
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>

                  </TouchableOpacity>


                </View>
              </>
            )}
          </Formik>
        </View>

     

        {isPassGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>

            <Text style={styles.subTitle}>Result:</Text>

            <Text style={styles.description}>Long Press to copy</Text>
            
            {/* selectable={true} is enables long press copy or sharing capability */}
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>

          </View>
        ) : null}

      {/* null means donot't render anything */}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
});
