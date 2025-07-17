import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'



// Form Validation
import * as Yup from 'yup' // import everything (without destructuring)

const passwordSchema = Yup.object().shape({
  // Define our properties on which we will be validating
  passwordLength: Yup.number()
  .min(4, 'Should be minimum of 4 character')
  .max(16, 'Should be minimum of 4 character') 
  .required('Length is required')

})

export default function App() {

  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)

  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setupperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)
  

  const generatePasswordString = (passwordLength: number) => {

      let characterList = '';

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChars
    }
    if (lowerCase) {
      characterList += lowerCaseChars
    }
    if (numbers) {
      characterList += digitChars
    }
    if (symbols) {
      characterList += specialChars
    }


      const passwordResult = createPassword(characterList, passwordLength)

      setPassword(passwordResult)
      setIsPassGenerated(true)

  }



  const createPassword = (characters: string, passwordLength: number) => {
      let result = ''
      for (let i = 0; i < passwordLength; i++) {
        const characterIndex = Math.round(Math.random() * characters.length)
        result += characters.charAt(characterIndex)
      }
      return result
  }



  // Important concept
  const resetPasswordState = () => {

    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(true)
    setupperCase(false)
    setNumbers(false)
    setSymbols(false)
  }


  
  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

const styles = StyleSheet.create({})