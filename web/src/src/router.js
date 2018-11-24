import Auth from './components/auth'
import Login from './components/login'
import Contests from './components/contests'
import EditUser from './components/edit-user'
import Register from './components/register'
import AccessDenied from './components/access-denied'
import AddProblem from './components/add-problem'

export const routes = [
  {
    path: '/',
    component: Auth(Contests),
  },
  {
    path: '/problems/add',
    component: AddProblem
  },
  {
    path: '/users/:id/edit',
    component: Auth(EditUser)
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },

  {
    path: '/access-denied',
    component: AccessDenied
  }
]