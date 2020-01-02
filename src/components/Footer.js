import React from 'react'

export default function Footer() {
    return (
        <div className="footer">
            <div className="container py-5">
            <div className="row">
                <div className="col-md-5">
                    <p><i className="fas fa-map-marker-alt fa-2x m-2"></i> <strong>Copac Square, 12 Duong Ton Dan, Phuong 13, Quan 4, Thanh Pho Ho Chi Minh</strong></p>
                    <p><i className="fas fa-phone fa-2x m-2"></i> <strong>0912853677</strong></p>
                    <p><i className="fas fa-envelope-open fa-2x m-2"></i><strong>melodycenter19@gmail.com</strong></p>
                </div>
                <div className="col-md-2">

                </div>
                <div className="col-md-5">
                    <h3><strong>Learning Music Online</strong></h3>
                    <p className="mt-4">This is my non-profit project to help people can learn music easier than the old one</p>
                    <div>
                        <i className="fab fa-facebook-square fa-2x p-1"></i>
                        <i class="fab fa-twitter-square fa-2x p-1"></i>
                        <i class="fab fa-instagram fa-2x p-1"></i>
                        <i class="fab fa-github-square fa-2x p-1"></i>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}
