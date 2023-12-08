import { useState, useContext, useEffect } from "react"
import { AppContext } from "../context/AppContext"

export default function NavBar() {
  const [theme, setTheme] = useState("light")
  const { showQuiz, showSettings, renderQuizSettings, renderHomePage } =
    useContext(AppContext)

  /** Handle the user's app color theme preferences **/
  useEffect(() => {
    const userThemePref = getUserThemePref()
    const mediaQueryPref = getMediaQueryPref()

    userThemePref ? setTheme(userThemePref) : setTheme(mediaQueryPref)

    document.body.dataset.theme = theme
  }, [theme])

  function getMediaQueryPref() {
    const mediaQuery = "(prefers-color-scheme: dark)"
    const mql = window.matchMedia(mediaQuery)
    const hasPreference = typeof mql.matches === "boolean"

    if (hasPreference) {
      return mql.matches ? "dark" : "light"
    }
  }

  function toggleTheme(e) {
    if (!e.key || e.key === "Enter") {
      const newTheme = theme === "dark" ? "light" : "dark"
      setTheme(newTheme)
      storeUserThemePref(newTheme)
      document.body.dataset.theme = theme
    }
  }

  function storeUserThemePref(pref) {
    localStorage.setItem("theme", pref)
  }

  function getUserThemePref() {
    return localStorage.getItem("theme")
  }

  const navBtn = showQuiz ? (
    <button onClick={renderQuizSettings} className="btn btn--small">
      &larr; Settings
    </button>
  ) : showSettings ? (
    <button onClick={renderHomePage} className="btn btn--small">
      &larr; Home
    </button>
  ) : null

  return (
    <nav className="nav-bar">
      {navBtn && navBtn}
      <button onClick={toggleTheme} className="btn btn--small theme-btn">
        {theme === "dark" ? "Light" : "Dark"}
      </button>
    </nav>
  )
}
