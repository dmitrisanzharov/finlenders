import React from "react";
import Link from "next/link";

const PageUnderConstruction = () => {
	return (
		<div>
			<section className="py-5 px-1 p-md-5">
				<div className="container">
					<h2>This page is under contruction!</h2>
					<h2 className="mt-4">
						For a demo, please visit the following pages:
					</h2>

					<ul className="mt-4">
						<li>
							{" "}
							<Link href="/">
								<a className='miniFooterNavBar'>
									Marketplace <i className="bi bi-link-45deg"></i>
								</a>
							</Link>
						</li>
						<li>
							{" "}
							<Link href="/sign-in">
								<a className='miniFooterNavBar'>
									Login <i className="bi bi-link-45deg"></i>
								</a>
							</Link>
						</li>
						<li>
                        {" "}
							<Link href="/register">
								<a className='miniFooterNavBar'>
									Get Started, Register page <i className="bi bi-link-45deg"></i>
								</a>
							</Link>
                        </li>
						<li>
                        {" "}
							<Link href="/contact">
								<a className='miniFooterNavBar'>
									Contact Us <i className="bi bi-link-45deg"></i>
								</a>
							</Link>
                        </li>
					</ul>

					{/* end of container */}
				</div>
			</section>
		</div>
	);
};

export default PageUnderConstruction;
