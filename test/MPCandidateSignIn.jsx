import { Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { MPButton, MPCheckBoxSingle, MPInput } from '../../../components'
import { MPInputPassword } from '../../../components/MPFormComponents/MPInputPassword/MPInputPassword'
import { metroSocialLinks } from '../../../constOptions'
import { useCandidateSignIn } from '../../../hooks'
import { MPCandidateAuth } from './MPCandidateAuth'

export const MPCandidateSignIn = () => {
  const {
    isLoading,
    onCheckChange,
    handleInputChange,
    validateMessages,
    candidateLoginData,
    handleSubmit
  } = useCandidateSignIn()

  return (
    <MPCandidateAuth>
      <div className="candidate-sign-up-left-section candidate-sign-up-section-wrap">
        <div className="candidate-signup-form-content">
          <div className="candidate-signup-layout-content w-100">
            <div className="candidate-page-title-wrap text-center">
              <h6 className="candidate-page-title fw-600">Sign in to InHealth Jobs</h6>
              <span className="candidate-page-subtitle fw-400 d-block">Enter your information to sign in to your account</span>
            </div>
            <div className="candidate-signup-form-wrap">
              <Row gutter={[16, 0]}>
                <Col span={24}>
                  <MPInput
                    id="signInEmailInput"
                    name="email"
                    dataTestId="sign-in-email-input"
                    labelText="Email"
                    placeholder="Ex. xyz@mail.com"
                    className="mtp-form-control email-input"
                    mainWrapperClass="mtp-input-wrapper-item-space mtp-form-sign-up-gap"
                    allowClear={false}
                    isDisabled={false}
                    isRequired={true}
                    isRequiredStarVisible={true}
                    requiredStarPosition="left"
                    readOnly={false}
                    isIcon={false}
                    defaultValue=""
                    maxLength=""
                    errorType=""
                    errorText={validateMessages?.emailError}
                    errorTextClass={validateMessages?.emailError ? "mtp-form-control-show-error" : ""}
                    value={candidateLoginData?.email}
                    handleChange={(event) => handleInputChange(event)}
                  />
                </Col>
                <Col span={24}>
                  <MPInputPassword
                    id="signInPasswordInput"
                    name="password"
                    dataTestId="signin-password-input"
                    labelText="Password"
                    placeholder="Must include at least 8 character"
                    className="mtp-form-control"
                    mainWrapperClass="mtp-input-wrapper-item-space mtp-form-sign-up-gap"
                    allowClear={false}
                    isDisabled={false}
                    isRequired={true}
                    isRequiredStarVisible={true}
                    requiredStarPosition="left"
                    readOnly={false}
                    isIcon={false}
                    defaultValue=""
                    maxLength=""
                    errorType=""
                    errorText={validateMessages?.passwordError}
                    errorTextClass={validateMessages?.passwordError ? "mtp-form-control-show-error" : ""}
                    value={candidateLoginData?.password}
                    handleChange={(event) => handleInputChange(event)}
                  />
                </Col>
                <Col span={24}>
                  <div className="signin-page-content">
                    <div className="remember-checkbox-section">
                      {/* <MPCheckBoxSingle
                        id="rememberMeCheckbox"
                        name="Remember Me Checkbox"
                        dataTestId="remember-me-checkbox"
                        className="checkbox-single"
                        checkBoxLabelClass="mtp-checkbox"
                        checkBoxLabelText="Remember Me"
                        checkBoxPosition="right"
                        checkBoxWrapperClass="mtp-checkbox-wrapper mtp-form-sign-up-gap"
                        handleChange={onCheckChange}
                      /> */}
                    </div>
                    <div className="forgot-password-section">
                      <Link to="/candidate/forgot-password" className="forgot-password-link">
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                </Col>
                <Col span={24} className="">
                  <MPButton
                    id="signInButton"
                    name="Sign in Button"
                    dataTestId="sign-in-button"
                    className="mtp-button mtp-sm-button ant-btn-mtp-filled-outlined isHoverShineLight w-100"
                    buttonText="Sign in"
                    buttonTextClass="fw-600"
                    isLoading={isLoading}
                    handleChange={handleSubmit}
                  //handleChange={() => setUpdateStatus(true)}
                  />
                </Col>
              </Row>
              <div className="candidate-page-signin-wrap mt-10">
                <div className="candidate-page-signin-text">
                  Don’t have an account?
                </div>
                <div className="candidate-page-signin-link">
                  <Link
                    to="/candidate/sign-up">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="candidate-page-content-footer">
            <div className="candidate-page-signup-social-wrap" >
              {metroSocialLinks.map((socialElem, socialIndex) => {
                return (
                  <div className="social-item-links" key={socialIndex}>
                    <a href={socialElem.socialLink} target="_blank" rel="noreferrer">
                      {socialElem.socialIcon}
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </MPCandidateAuth>
  )
}