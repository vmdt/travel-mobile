import { Image, Keyboard, Pressable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { BackButton, Input, Password, ReusableBtn, ReusableText, ScreenWrapper } from '../../components'
import styles from './login.style'
import { useNavigation } from '@react-navigation/native'
import { COLORS, SIZES } from '../../constants/theme'
import Icon from '../../assets/icons'

const Login = () => {
    const navigation = useNavigation()
    const [obsecureText, setObsecureText] = React.useState(true)

    return (
        <ScreenWrapper>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <BackButton size={SIZES.xLarge} onPress={() => navigation.goBack()} />
                    <View>
                        <ReusableText
                            text='Hey,'
                            family='xtrabold'
                            size={SIZES.xxLarge}
                            color={COLORS.black}
                        />       
                        
                        <ReusableText
                            text='Welcome to your journey'
                            family='xtrabold'
                            size={SIZES.xxLarge}
                            color={COLORS.black}
                        />
                    </View>

                    <View style={styles.form}>
                        <ReusableText 
                            text='Login to continue'
                            family='medium'
                            size={SIZES.large}
                            color={COLORS.black}
                        />
                        <Input
                            containerStyles={{ height: 60 }}
                            icon={ <Icon name='mail' strokeWidth={1.6} size={SIZES.xLarge} /> } 
                            placeholder='Email'
                            keyboardType='email-address'
                        />
                        
                        <Password
                            containerStyles={{ height: 60 }}
                            icon={ <Icon name='lock' strokeWidth={1.6} size={SIZES.xLarge} /> } 
                            placeholder='Password'
                            secureTextEntry={obsecureText}
                            isObsecure={obsecureText}
                            toggleObsecure={() => setObsecureText(!obsecureText)}
                        />

                        <ReusableText
                            style={styles.forgotPassword}
                            text='Forgot Password?'
                            family='medium'
                            size={SIZES.medium}
                            color={COLORS.black}
                        />

                        <ReusableBtn
                            onPress={() => {}}
                            btnText='Login'
                            btnWidth={SIZES.full}
                            backgroundColor={COLORS.lightGreen}
                            textColor={COLORS.white}
                            styleBtn={{ height: 60 }}
                            styleText={{ fontSize: SIZES.xLarge, fontFamily: 'xtrabold' }}
                        />

                        <TouchableOpacity
                            style={styles.googleBtn}
                            onPress={() => {}}
                        >
                            <Image source={require('../../assets/images/icons/google_96px.png')} style={styles.googleIcon} />
                            <ReusableText text='Login with Google' family='medium' size={SIZES.medium} color={COLORS.black} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <ReusableText
                            text='Don’t have an account?'
                            family='medium'
                            size={SIZES.medium}
                            color={COLORS.black}
                        />
                        <Pressable onPress={() => navigation.navigate('Signup')}>
                            <ReusableText text='Signup' family='medium' size={SIZES.medium} color={COLORS.lightGreen} />
                        </Pressable>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ScreenWrapper>
    )
}

export default Login