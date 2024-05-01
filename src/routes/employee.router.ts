import express,{Router} from 'express'
const router:Router = Router()
import { addEmployee, getAllEmployee } from '../controller/employee.controller'


router.get('/allEmployees',getAllEmployee)
// router.post('/addEmployee',obj.addEmployee)
router.post('/addEmployee',addEmployee)



export default router