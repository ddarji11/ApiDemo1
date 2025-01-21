import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.css'
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'

function Crud() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [isActive, setIsActive] = useState(0);

    const [editid, seteditId] = useState(0)
    const [editname, seteditName] = useState('');
    const [editage, seteditAge] = useState('');
    const [editisActive, seteditIsActive] = useState(0);



    const empdata = [
        {
            id: 1,
            name: 'manoj',
            age: 21,
            isActive: 1
        },
        {
            id: 2,
            name: 'rohit',
            age: 25,
            isActive: 1
        },
        {
            id: 3,
            name: 'sushan',
            age: 20,
            isActive: 0
        }
    ]
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    function getData() {
        axios.get(`http://localhost:5237/api/Employee`)
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function handleEdit(id) {
        handleShow();

        console.log(id);
        axios.get(`http://localhost:5237/api/Employee/${id}`)
            .then((result) => {

                seteditName(result.data.name);
                seteditAge(result.data.age);
                seteditIsActive(result.data.editisActive);
                seteditId(id);

            })
            .catch((error) => {
                console.log(error);
            })

    }
    function handleDelete(id) {
        if (window.confirm("are you sure to delete this data?") == true) {
            axios.delete(`http://localhost:5237/api/Employee/${id}`)
                .then((result) => {
                    getData();
                })
        }
    }
    function handleUpdate() {

    
        const url = `http://localhost:5237/api/Employee/${editid}`;
        const data = {
            "id": editid,
            "name": editname,
            "age": editage,
            "isActive": editisActive
        }

        axios.put(url, data)
            .then((result) => {
                getData();
                console.log(result);
                //clear();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function handleSave() {
        const url = 'http://localhost:5237/api/Employee';
        const data = {

            "name": name,
            "age": age,
            "isActive": isActive
        }

        axios.post(url, data)
            .then((result) => {
                getData();
                clear();
            })
    }
    function clear() {
        setName('');
        setAge('');
        setIsActive(0);
        seteditName('');
        seteditAge('');
        seteditIsActive(0);
        seteditId(0);
    }
    




    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <input type="text" className="form-control" placeholder="enter name" value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </Col>
                    <Col>
                        <input type="text" className="form-control" placeholder="enter age" value={age}
                            onChange={(e) => setAge(e.target.value)} />
                    </Col>
                    <Col>
                        <input type="checkbox" value={isActive}


                            onChange={(e) => seteditIsActive(e.target.checked ? 1 : 0)} />

                        <label>isActive</label>
                    </Col>
                    <Col>
                        <button className="btn btn-primary" onClick={() => { handleSave() }}>Submit</button>
                    </Col>
                </Row>
            </Container>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>age</th>
                        <th>isActive</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        data && data.length > 0 ? (
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.age}</td>
                                        <td>{item.isActive}</td>

                                        <td colSpan={2}>
                                            <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button> &nbsp;
                                            <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>

                                        </td>
                                    </tr>
                                )

                            })
                        )
                            : (
                                <tr>
                                    <td>loading...</td>
                                </tr>

                            )

                    }
                </tbody>
            </Table>



            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <input type="text" className="form-control" placeholder="enter name" value={editname}
                                onChange={(e) => seteditName(e.target.value)} />
                        </Col>
                        <Col>
                            <input type="text" className="form-control" placeholder="enter age" value={editage}
                                onChange={(e) => seteditAge(e.target.value)} />
                        </Col>
                        <Col>
                            <input type="checkbox" value={editisActive}

                                onChange={(e) => seteditIsActive(e.target.checked ? 1 : 0)} />
                            <label>isActive</label>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}
export default Crud;




