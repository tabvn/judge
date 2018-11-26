import Auth from './components/auth'
import Login from './components/login'
import Contests from './components/contests'
import EditUser from './components/edit-user'
import Register from './components/register'
import AccessDenied from './components/access-denied'
import AddProblem from './components/add-problem'
import EditProblem from './components/edit-problem'
import Problem from './components/problem'
import AdminContests from './components/admin-contests'
import AddContest from './components/add-contest'

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
    path: '/contests/:contest_id/problems/:id',
    component: Auth(Problem)
  },
  {
    path: '/admin/contests',
    component: Auth(AdminContests)
  },
  {
    path: '/admin/contests/add',
    component: Auth(AddContest)
  },
  {
    path: '/problems/:id/edit',
    component: EditProblem
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