import { Container, Table, TableBody, TableCell, TableHead, TableRow, TableFooter } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TablePagination from "../ui/TablePagination";



const UserListPage = () => {
const [user , setUser] = useState([]);
const [page , setPage] = useState(0);
const [rowsPerPage] = useState(5);


useEffect(() => {

axios.get(`${process.env.REACT_APP_API_URL}/setest`).then(res => setUser(res.data))

},[])

const delUser = (id) => {
try{
axios.delete(`${process.env.REACT_APP_API_URL}/use/delete/${id}`)
}
catch (err){

    alert(err);

}

}

const handleChangePage = (e,newPage) => {
setPage(newPage)


}



    return (
        <Container maxWidth='lg' style={{ marginTop: 10+'px'}}>
        <div style={{ backgroundColor : 'white', padding: 40+'px', borderRadius : 10+'px'}}> 
        <div style={{ fontWeight: 600 , fontSize: 24+'px', marginBottom : 50+'px'}}>All Users</div>
        <Table style={{width : 95+'%',margin : 'auto'}}>
            <TableHead>
                <TableRow style={{backgroundColor : '#3f51b5'}}>
            <TableCell style={{color: 'white' }} align="right">ID</TableCell>
            <TableCell style={{color: 'white' }} align="right">Username</TableCell>
            <TableCell style={{color: 'white' }} align="right">Role</TableCell>
            <TableCell style={{color: 'white' }} align="right"></TableCell>

                </TableRow>
            </TableHead>
            <TableBody>

          
            {(rowsPerPage) > 0 ? user.slice(page * rowsPerPage,page* rowsPerPage + rowsPerPage).map( user => {
            return <TableRow>
                <TableCell align="right">{user.userId}</TableCell>
                <TableCell align="right">{user.userName}</TableCell>
                <TableCell align="right">{user.role}</TableCell>
              {user.role.toLowerCase()!== 'admin' && <TableCell align="right"> <button className="AddButton">Edit</button> <button className="delFromCart" onClick={delUser(user.userId)}>DELETE</button></TableCell>} 

            </TableRow>

        }) : <TableRow> <TableCell/></TableRow>}

    

        
        </TableBody>

        <TableFooter >

            
      <TableRow>
      <TableCell colSpan={4} align="right">
         
     <TablePagination onPageChange={handleChangePage} count={user.length} page={page} rowsPerPage={rowsPerPage}></TablePagination>
</TableCell>
        </TableRow>

        </TableFooter>




        </Table>
        </div>
    </Container>
    )
}

export default UserListPage
