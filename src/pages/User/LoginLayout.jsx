import React, { Fragment } from "react"
import styles from "./login.css"

class LoginLayout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <Fragment>
        <div className={styles.form}>
        {children}
        </div>
      </Fragment>
    )
  }
}

export default LoginLayout