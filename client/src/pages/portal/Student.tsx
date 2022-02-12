import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Courses from '../course/Courses'
import { getCookie } from '../helpers'
import { User } from '../types'

/**
 * This view should show the students and all the courses they are enrolled in and be able to enrol in new courses.
 * @returns The student view.
 */
const Student = () => {
    const [isAuthenticated, setAuth] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [user, setUser] = useState<User>()
    const navigate = useNavigate()
    useEffect(() => {
        //
        try {
            const person = JSON.parse(getCookie('user')!)
            if (person.user[0] != null) {
                if (person.user[0].role == 'student' || person.user[0].role == 'admin') {
                    setUser(person.user[0])
                    setAuth(true)
                } else {
                    setAuth(false)
                    navigate('/error')
                }
            } else {
                setAuth(false)
                navigate('/error')
            }
        } catch {
            setAuth(false)
            navigate('/error')
        }
    }, [isAuthenticated])
    return (
        <>
            <Courses />
        </>
    )
}
export default Student
