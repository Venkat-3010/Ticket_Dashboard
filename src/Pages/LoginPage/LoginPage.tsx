import styles from './LoginPage.module.css';
import logo from '../../assets/logo.png';
import microsoft from '../../assets/microsoft.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Toast } from 'primereact/toast';

const LoginPage = () => {
    const toast = useRef<Toast>(null);
    const [, setCookie] = useCookies();
    const navigate = useNavigate();
    const auth_code = 'https://taliceplannerapi.azurewebsites.net/Login'

    const onButtonClick = () => {
        getAuthUrl();
    };

    const getAuthUrl = (async () => {
        try {
            await axios.get(`${auth_code}/SSOUrl`).then(
                async (res) => {
                    window.location.href = res?.data;
                }
            )
        } catch (err) {
            console.log('Error fetching data:', err);
        }
    })

    const getAccessToken = async () => {
        try {
            const code = new URL(window.location.href).searchParams.get('code');
            if (!code) {
                return;
            }

            const res = await axios.get(`${auth_code}/AccessToken?code=${code}`);
            // console.log(res)
            if (res?.data?.token) {
                // console.log('Access token fetched successfully:', res.data.token);
                // localStorage.setItem('loginToken', res.data.token)
                setCookie('loginToken', res.data.token, { path: '/', secure: true });
                navigate('/');
            } else {
                window.location.href = '/';
                console.log('Access token is missing.');
            }
        } catch (err) {
            console.log('Error fetching access token:', err);
            toast?.current?.show({
                severity: 'warn',
                summary: 'Login Error',
                detail: 'Failed to fetch access token. Please try again.',
            });
        }
    };


    useEffect(() => {
        getAccessToken();
    }, []);

    return (
        <div>
            <Toast ref={toast} />
            <div className={styles.LoginPage_container} >
                <div className={styles.LoginPage_center_container} >
                    <div className={styles.LoginPage_top_logo}>
                        <img src={logo} alt='logo' />
                    </div>
                    <div className={styles.login_btn_container}>

                        <div className={styles.login_btn_padding}
                        >
                            <div
                                className={styles.login_btn_img}
                                onClick={onButtonClick}
                            >
                                <img src={microsoft} alt='not found' />
                            </div>
                        </div>
                    </div>
                    <div className={styles.LoginPage_bottom_logo}>
                        <div className={styles.LoginPage_bottom_logo_img}>
                            <img src={logo} alt='logo not found' style={{ width: "20vw", textAlign: "center", objectFit: "contain" }} />
                        </div>
                        <p>{`© ${new Date().getFullYear()} Talice. All rights reserved.`}</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default LoginPage