import { Typography} from "antd";


function Footer() {
    return <div className="Footer">
        <Typography.Link href="https://www.google.com" target={'_blank'} >Privacy Policy</Typography.Link>
        <Typography.Link href="https://www.google.com" target={'_blank'} >Terms & Condition </Typography.Link>
        <Typography.Link href=":tel:+123456789" target={'_blank'} >+123456789 </Typography.Link>
        Copyright © 2025 
        </div>
  }

  export default Footer;