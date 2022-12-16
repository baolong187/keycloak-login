import React, { memo } from "react";
import DefaultTemplate from "./Template";
import type { TemplateProps } from "./Template";
import type { KcProps } from "./KcProps";
import type { KcContextBase } from "../getKcContext/KcContextBase";
import { clsx } from "../tools/clsx";
import type { I18n } from "../i18n";

export type LoginConfigTotpProps = KcProps & {
    kcContext: KcContextBase.LoginConfigTotp;
    i18n: I18n;
    doFetchDefaultThemeResources?: boolean;
    Template?: (props: TemplateProps) => JSX.Element | null;
};

const LoginConfigTotp = memo((props: LoginConfigTotpProps) => {
    const { kcContext, i18n, doFetchDefaultThemeResources = true, Template = DefaultTemplate, ...kcProps } = props;

    const { url, isAppInitiatedAction, totp, mode, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const algToKeyUriAlg: Record<KcContextBase.LoginConfigTotp["totp"]["policy"]["algorithm"], string> = {
        "HmacSHA1": "SHA1",
        "HmacSHA256": "SHA256",
        "HmacSHA512": "SHA512"
    };

    return (
        <Template
            {...{ kcContext, i18n, doFetchDefaultThemeResources, ...kcProps }}
            headerNode={"Thiết lập xác thực di động"}
            formNode={
                <>
                    <ol id="kc-totp-settings">
                        <li>
                            <p>{"Cài đặt một trong các ứng dụng sau trên điện thoại di động của bạn:"}</p>

                            <ul id="kc-totp-supported-apps">
                                {totp.policy.supportedApplications.map(app => (
                                    <li>{app}</li>
                                ))}
                            </ul>
                        </li>

                        {mode && mode == "manual" ? (
                            <>
                                <li>
                                    <p>{"Mở ứng dụng và nhập key:"}</p>
                                    <p>
                                        <span id="kc-totp-secret-key">{totp.totpSecretEncoded}</span>
                                    </p>
                                    <p>
                                        <a href={totp.qrUrl} id="mode-barcode">
                                            {"Quét mã vạch?"}
                                        </a>
                                    </p>
                                </li>
                                <li>
                                    <p>{"Sử dụng các giá trị cấu hình sau nếu ứng dụng cho phép đặt chúng:"}</p>
                                    <p>
                                        <ul>
                                            <li id="kc-totp-type">
                                                {"Loại hình"}: {msg(`loginTotp.${totp.policy.type}`)}
                                            </li>
                                            <li id="kc-totp-algorithm">
                                                {"Thuật toán"}: {algToKeyUriAlg?.[totp.policy.algorithm] ?? totp.policy.algorithm}
                                            </li>
                                            <li id="kc-totp-digits">
                                                {"Chữ số"}: {totp.policy.digits}
                                            </li>
                                            {totp.policy.type === "totp" ? (
                                                <li id="kc-totp-period">
                                                    {"Khoảng thời gian"}: {totp.policy.period}
                                                </li>
                                            ) : (
                                                <li id="kc-totp-counter">
                                                    {"Counter"}: {totp.policy.initialCounter}
                                                </li>
                                            )}
                                        </ul>
                                    </p>
                                </li>
                            </>
                        ) : (
                            <li>
                                <p>{"Mở ứng dụng và quét mã vạch:"}</p>
                                <img id="kc-totp-secret-qr-code" src={`data:image/png;base64, ${totp.totpSecretQrCode}`} alt="Figure: Barcode" />
                                <br />
                                <p>
                                    <a href={totp.manualUrl} id="mode-manual">
                                        {"Không thể quét?"}
                                    </a>
                                </p>
                            </li>
                        )}
                        <li>
                            <p>{"Nhập mã một lần được cung cấp bởi ứng dụng và nhấp vào Gửi để hoàn thành thiết lập."}</p>
                            <p>{"Cung cấp tên thiết bị để quản lý các thiết bị OTP của mình."}</p>
                        </li>
                    </ol>

                    <form action={url.loginAction} className={clsx(kcProps.kcFormClass)} id="kc-totp-settings-form" method="post">
                        <div className={clsx(kcProps.kcFormGroupClass)}>
                            <div className={clsx(kcProps.kcInputWrapperClass)}>
                                <label htmlFor="totp" className={clsx(kcProps.kcLabelClass)}>
                                    {"Mã một lần"}
                                </label>{" "}
                                <span className="required">*</span>
                            </div>
                            <div className={clsx(kcProps.kcInputWrapperClass)}>
                                <input
                                    type="text"
                                    id="totp"
                                    name="totp"
                                    autoComplete="off"
                                    className={clsx(kcProps.kcInputClass)}
                                    aria-invalid={messagesPerField.existsError("totp")}
                                />

                                {messagesPerField.existsError("totp") && (
                                    <span id="input-error-otp-code" className={clsx(kcProps.kcInputErrorMessageClass)} aria-live="polite">
                                        {messagesPerField.get("totp")}
                                    </span>
                                )}
                            </div>
                            <input type="hidden" id="totpSecret" name="totpSecret" value={totp.totpSecret} />
                            {mode && <input type="hidden" id="mode" value={mode} />}
                        </div>

                        <div className={clsx(kcProps.kcFormGroupClass)}>
                            <div className={clsx(kcProps.kcInputWrapperClass)}>
                                <label htmlFor="userLabel" className={clsx(kcProps.kcLabelClass)}>
                                    {"Tên thiết bị"}
                                </label>{" "}
                                {totp.otpCredentials.length >= 1 && <span className="required">*</span>}
                            </div>
                            <div className={clsx(kcProps.kcInputWrapperClass)}>
                                <input
                                    type="text"
                                    id="userLabel"
                                    name="userLabel"
                                    autoComplete="off"
                                    className={clsx(kcProps.kcInputClass)}
                                    aria-invalid={messagesPerField.existsError("userLabel")}
                                />
                                {messagesPerField.existsError("userLabel") && (
                                    <span id="input-error-otp-label" className={clsx(kcProps.kcInputErrorMessageClass)} aria-live="polite">
                                        {messagesPerField.get("userLabel")}
                                    </span>
                                )}
                            </div>
                        </div>

                        {isAppInitiatedAction ? (
                            <>
                                <input
                                    type="submit"
                                    className={clsx(kcProps.kcButtonClass, kcProps.kcButtonPrimaryClass, kcProps.kcButtonLargeClass)}
                                    id="saveTOTPBtn"
                                    value={msgStr("doSubmit")}
                                />
                                <button
                                    type="submit"
                                    className={clsx(
                                        kcProps.kcButtonClass,
                                        kcProps.kcButtonDefaultClass,
                                        kcProps.kcButtonLargeClass,
                                        kcProps.kcButtonLargeClass
                                    )}
                                    id="cancelTOTPBtn"
                                    name="cancel-aia"
                                    value="true"
                                >
                                    ${"Hủy bỏ"}
                                </button>
                            </>
                        ) : (
                            <input
                                type="submit"
                                className={clsx(kcProps.kcButtonClass, kcProps.kcButtonPrimaryClass, kcProps.kcButtonLargeClass)}
                                id="saveTOTPBtn"
                                value={msgStr("doSubmit")}
                            />
                        )}
                    </form>
                </>
            }
        />
    );
});

export default LoginConfigTotp;
