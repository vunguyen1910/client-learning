import React, { useState } from "react";
import { useHistory, useParams} from "react-router-dom";
export default function EditUser(props) {
    const [name, setName] = useState(props.currentUser && props.currentUser.name);
    const [email, setEmail] = useState(props.currentUser && props.currentUser.email);
    const [desc, setDesc] = useState(props.currentUser && props.currentUser.desc);
    const [avata_url, setAvata] = useState(props.currentUser && props.currentUser.avata_url)
    const [phone, setPhone] = useState(props.currentUser && props.currentUser.phone)
    const {id} = useParams()
    const history = useHistory();
    if (!props.currentUser) history.push("/")
    const handleSubmit = event => {
      event.preventDefault();
      postUser();
      history.goBack()
    };
    const postUser = async () => {
      const resp = await fetch(`${process.env.REACT_APP_URL_DATABASE}/edit-user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({
            "email": email,
            "name": name,
            "desc": desc,
            "avata_url": avata_url,
            "phone": phone
        })
      });
      if (resp.ok) {
        // co 2 truong hop cua resp 1)resp backend tra ve, 2) error, backend ko tra ve, do HTTP tu tra ve
        const data = await resp.json(); // data la` cua backend tra ve
        if (data.success) {
          history.push("/login");
        }
      }
    };
    return (
      <section className="jumbotron bg-transparent">
        <div className="row">
          <div className="col-lg-6 d-none d-md-block text-center">
            <img src={require("../img/login-img.png")} />
          </div>
          <div className="col-lg-6 pr-5">
            <h1 className="title-signin text-center">Edit your profile</h1>
            <form
              className="container needs-validation"
              novalidate
            >
              <div className="form-group">
                <label className="login-label">Email address</label>
                <input
                  type="email"
                  className="form-control rounded-pill input-login text-center"
                  id="validationCustom01"
                  required
                  name="email"
                  defaultValue={email}
                  onChange={(e)=> setEmail(e.target.value)}
                />
              </div>
              <div className="row">
              <div className="form-group col-md-6">
                <label className="login-label">Full Name</label>
                <input
                  type="text"
                  className="form-control rounded-pill input-login text-center"
                  id="validationCustom02"
                  required
                  name="name"
                  defaultValue={name}
                  onChange={(e)=> setName(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="login-label">Phone</label>
                <input
                  type="phone"
                  className="form-control rounded-pill input-login text-center"
                  id="validationCustom02"
                  required
                  name="phone"
                  defaultValue={phone}
                  onChange={(e)=> setPhone(e.target.value)}
                />
              </div>
              </div>
              <div className="form-group">
                <label className="login-label">Avata URL</label>
                <input
                  type="url"
                  className="form-control rounded-pill input-login text-center"
                  id="validationCustom02"
                  required
                  name="avata_url"
                  defaultValue={avata_url}
                  onChange={(e)=> setAvata(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="login-label">Description</label>
                <input
                  type="text"
                  className="form-control rounded-pill input-login text-center"
                  id="validationCustom02"
                  required
                  name="desc"
                  defaultValue={desc}
                  onChange={(e)=> setDesc(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn login-button p-3 px-5 justify-content-center"
                  onClick={e => handleSubmit(e)}
                >
                    Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
}
