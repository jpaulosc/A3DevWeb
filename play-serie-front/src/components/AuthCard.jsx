import { Link, useNavigate } from "react-router-dom";
import Brand from "../components/Brand";

function AuthCard({ title, backBtn, children, onSubmit }) {
  const navigate = useNavigate();
  return (
    <>
      {backBtn ? (
        <Link role="button" onClick={() => navigate(-1)} className="cursor-pointer self-start mb-2">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_28_1420)">
              <path d="M40 22H15.66L26.84 10.82L24 8L8 24L24 40L26.82 37.18L15.66 26H40V22Z" fill="black" />
            </g>
            <defs>
              <clipPath id="clip0_28_1420">
                <rect width="48" height="48" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link >
      ) : <Brand />}
      {title && <h1 className="font-medium text-2xl">{title}</h1>}
      <form action="" method="post" className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
        {children}
      </form>
    </>
  );
}

export default AuthCard;
