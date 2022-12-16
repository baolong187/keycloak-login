import React, { useState, memo } from "react";
import DefaultTemplate from "./Template";
import type { TemplateProps } from "./Template";
import type { KcProps } from "./KcProps";
import type { KcContextBase } from "../getKcContext/KcContextBase";
import { clsx } from "../tools/clsx";
import { useConstCallback } from "powerhooks/useConstCallback";
import type { FormEventHandler } from "react";
import type { I18n } from "../i18n";
import { message } from "antd";
import callApi from "../util/callApi"
import { Select } from 'antd';

const BASE_URL = "https://api-dev-rnd.cmctelecom.vn/api/v2/crm-service/";
const { Option } = Select;
export type LoginProps = KcProps & {
    kcContext: KcContextBase.Login;
    i18n: I18n;
    doFetchDefaultThemeResources?: boolean;
    Template?: (props: TemplateProps) => JSX.Element | null;
};

const Login = memo((props: LoginProps) => {
    const { kcContext, i18n, doFetchDefaultThemeResources = true, Template = DefaultTemplate, ...kcProps } = props;
    const { social, realm, url, usernameEditDisabled, login, auth, registrationDisabled } = kcContext;
    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const [listEmail, setListEmail] = React.useState<any[]>([]);
    const [isChooseEmail, setIsChooseEmail] = React.useState(false);
    const [username, setUsername] = React.useState(login.username || "");
    const [inputUsername, setInputUsername] = React.useState(login.username || "");
    const [chooseEmail, setChooseEmail] = React.useState("");


    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
        e.preventDefault();
        setIsLoginButtonDisabled(true);
        const formElement = e.target as HTMLFormElement;

        formElement.querySelector("input[name='email']")?.setAttribute("name", "username");
        formElement.submit();
    });

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const onChangeInputUsername = (event: any) => {
        const { name, value } = event.target;
        setInputUsername(value)
    }

    const callApiGetEmailByNumber = async (phoneNumber: string) => {
        const listEmail = await callApi(`${BASE_URL}account/get-email-by-phone/${phoneNumber}`, "GET", {});
        const { result } = listEmail || {};
        if (!(listEmail && result.length)) {
            return false;
        }
        setListEmail(result)
        return result;
    }

    const handleNext = async () => {
        setUsername(chooseEmail)
        const step = isChooseEmail ? 1 : 2;
        setActiveStep((prevActiveStep) => prevActiveStep + step);
    };

    const handleNextEmail = async () => {
        if (!inputUsername) {
            message.error("Vui lòng nhập tài khoản hoặc email", 3)
            return
        }
        let isChoose = false;
        let usernameLogin = inputUsername;
        if (!validateEmail(inputUsername)) {
            const data = await callApiGetEmailByNumber(inputUsername);
            if (data) {
                if (data.length == 1) {
                    usernameLogin = data[0]
                } else { isChoose = true }
            }
        }

        setUsername(usernameLogin)
        setIsChooseEmail(isChoose)
        setChooseEmail("")
        const step = isChoose ? 1 : 2;
        setActiveStep((prevActiveStep) => prevActiveStep + step);
    };

    const handleBack = () => {
        const step = isChooseEmail ? 1 : 2;
        setActiveStep((prevActiveStep) => prevActiveStep - step);
    };


    const onChangeSelected = (value: string) => {
        setChooseEmail(value)
    };

    const onSearchSelected = (value: string) => {
        // console.log('search:', value);
    };

    return (
        <Template
            {...{ kcContext, i18n, doFetchDefaultThemeResources, ...kcProps }}
            displayInfo={social.displayInfo}
            displayWide={realm.password && social.providers !== undefined}
            headerNode={"Đăng nhập vào C.OPE2N"}
            formNode={
                <div id="kc-form" className={clsx(realm.password && social.providers !== undefined && kcProps.kcContentWrapperClass)}>
                    <div
                        id="kc-form-wrapper"
                        className={clsx(
                            realm.password && social.providers && [kcProps.kcFormSocialAccountContentClass, kcProps.kcFormSocialAccountClass]
                        )}
                    >
                        {realm.password && (
                            <form id="kc-form-login" onSubmit={onSubmit} action={url.loginAction} method="post">

                                <div className={`${clsx(kcProps.kcFormGroupClass)} ${[0].includes(activeStep) ? "kc-active" : "kc-hide"}`}>
                                    {(() => {
                                        const label = !realm.loginWithEmailAllowed
                                            ? "username"
                                            : realm.registrationEmailAsUsername
                                                ? "email"
                                                : "usernameOrEmail";
                                        const autoCompleteHelper: typeof label = label === "usernameOrEmail" ? "username" : label;

                                        return (
                                            <>
                                                <div className="kc-head-input">
                                                    <label htmlFor={autoCompleteHelper} className={`${clsx(kcProps.kcLabelClass)} kc-label-input`}> Email or phonenumber </label>
                                                    <div className={`${clsx(kcProps.kcFormOptionsWrapperClass)} kc-label-forgot-password`}>
                                                        {realm.resetPasswordAllowed && (
                                                            <span>
                                                                <a tabIndex={5} className="kc-forgot-password" href={url.loginResetCredentialsUrl}>Quên mật khẩu</a>
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <input
                                                    tabIndex={1}
                                                    id={autoCompleteHelper}
                                                    className={`${clsx(kcProps.kcInputClass)} kc-hide`}
                                                    name={autoCompleteHelper}
                                                    type="text"
                                                    value={username || ""}
                                                    {...(usernameEditDisabled
                                                        ? { "disabled": true }
                                                        : {
                                                            "autoFocus": true,
                                                            "autoComplete": "off"
                                                        })}
                                                />
                                                <input
                                                    tabIndex={1}
                                                    className={`${clsx(kcProps.kcInputClass)} kc-form-input`}
                                                    type="text"
                                                    onChange={onChangeInputUsername}
                                                    value={inputUsername || ""}
                                                    {...(usernameEditDisabled
                                                        ? { "disabled": true }
                                                        : {
                                                            "autoFocus": true,
                                                            "autoComplete": "off"
                                                        })}
                                                />
                                            </>
                                        );
                                    })()}
                                </div>

                                <div className={`${clsx(kcProps.kcFormGroupClass)} ${[1].includes(activeStep) ? "kc-active" : "kc-hide"}`}>
                                    <div className="kc-container-back">
                                        <button type="button" className="kc-button-login-back" onClick={handleBack} />
                                        <span> {inputUsername} </span>
                                    </div>
                                    <div>
                                        <label className={`${clsx(kcProps.kcLabelClass)} kc-label-input`}> Select your email login </label>
                                        <div className="kc-head-input">
                                            <Select
                                                showSearch
                                                placeholder="Select a email"
                                                optionFilterProp="children"
                                                style={{ width: "100%" }}
                                                onSelect={onChangeSelected}
                                                onSearch={onSearchSelected}
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                options={(listEmail || []).map(d => ({
                                                    value: d,
                                                    label: d,
                                                }))}
                                            />

                                        </div>
                                    </div>
                                </div>

                                <div className={`${clsx(kcProps.kcFormGroupClass)} ${[2].includes(activeStep) ? "kc-active" : "kc-hide"}`}>
                                    <div className="kc-container-back">
                                        <button type="button" className="kc-button-login-back" onClick={handleBack} />
                                        <span> {username} </span>
                                    </div>

                                    <div className="kc-head-input">
                                        <label htmlFor="password" className={`${clsx(kcProps.kcLabelClass)} kc-label-input`}>Mật khẩu</label>
                                        <div className={`${clsx(kcProps.kcFormOptionsWrapperClass)} kc-label-forgot-password`}>
                                            {realm.resetPasswordAllowed && (
                                                <span>
                                                    <a tabIndex={5} className="kc-forgot-password" href={url.loginResetCredentialsUrl}>Quên mật khẩu</a>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <input
                                        tabIndex={2}
                                        id="password"
                                        className={`${clsx(kcProps.kcInputClass)} kc-form-input`}
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                    />
                                </div>

                                <div className={clsx(kcProps.kcFormGroupClass, kcProps.kcFormSettingClass)}>
                                    <div id="kc-form-options" className={`${clsx(kcProps.kcFormGroupClass)} ${[2].includes(activeStep) ? "kc-active" : "kc-hide"}`}>
                                        {realm.rememberMe && !usernameEditDisabled && (
                                            <div className="checkbox">
                                                <label className="rememberMeContainer">
                                                    <input
                                                        tabIndex={3}
                                                        id="rememberMe"
                                                        name="rememberMe"
                                                        type="checkbox"
                                                        {...(login.rememberMe
                                                            ? {
                                                                "checked": true
                                                            }
                                                            : {})}
                                                    />
                                                    Ghi nhớ
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>

                                        )}
                                    </div>
                                </div>

                                <div id="kc-form-buttons" className={clsx(kcProps.kcFormGroupClass)}>
                                    <input type="hidden" id="id-hidden-input" name="credentialId" {...(auth?.selectedCredential !== undefined ? { "value": auth.selectedCredential } : {})} />

                                    {[0].includes(activeStep) && (
                                        <button type="button" className="kc-button kc-button-login-next" onClick={handleNextEmail} disabled={inputUsername ? false : true} > Tiếp theo </button>
                                    )}

                                    {[1].includes(activeStep) && (
                                        <button type="button" className="kc-button kc-button-login-next" onClick={handleNext} disabled={chooseEmail ? false : true} > Tiếp theo </button>
                                    )}

                                    {[2].includes(activeStep) && (
                                        <>
                                            <input
                                                tabIndex={4}
                                                className={`${clsx(kcProps.kcButtonClass, kcProps.kcButtonPrimaryClass, kcProps.kcButtonBlockClass, kcProps.kcButtonLargeClass)} kc-button`}
                                                name="login"
                                                id="kc-login"
                                                type="submit"
                                                value="Đăng nhập"
                                                disabled={isLoginButtonDisabled}
                                            />
                                        </>

                                    )}
                                </div>
                            </form>
                        )}
                    </div>

                    {realm.password && social.providers !== undefined && (
                        <div id="kc-social-providers" className={clsx(kcProps.kcFormSocialAccountContentClass, kcProps.kcFormSocialAccountClass)}>
                            {/* <div className="kc-solid-form"> </div> */}
                            {/* <div className="kc-label-providers"> Hoặc bạn có thể đăng nhập qua </div> */}
                            <ul
                                className={clsx(
                                    kcProps.kcFormSocialAccountListClass,
                                    social.providers.length > 4 && kcProps.kcFormSocialAccountDoubleListClass
                                )}
                            >
                                {social.providers.map(p => (
                                    <li key={p.providerId} id={p.providerId} className={clsx(kcProps.kcFormSocialAccountListLinkClass)}>
                                        <a href={p.loginUrl} id={`social-${p.alias}`} className="kc-social-item">
                                            <span>{p.displayName}</span>
                                            <i className="kc-icon-providers"></i>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            }
            infoNode={
                realm.password &&
                realm.registrationAllowed &&
                !registrationDisabled && (
                    <div id="kc-registration">
                        <span>
                            <a tabIndex={6} href={url.registrationUrl}>
                                Đăng ký tài khoản
                            </a>
                        </span>
                    </div>
                )
            }
        />
    );
});

export default Login;
