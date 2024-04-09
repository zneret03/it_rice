interface LabelTypes {
  title: string
  path: string
}

export const labels: LabelTypes[] = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'About',
    path: '/#about'
  },
  {
    title: 'Login',
    path: '/login'
  }
]

export const adminLabels: LabelTypes[] = [
  {
    title: 'Dashboard',
    path: '/dashboard'
  },
  {
    title: 'Production',
    path: '/production'
  },
  {
    title: 'Account',
    path: '/account'
  },
  {
    title: 'Logout',
    path: ''
  }
]
