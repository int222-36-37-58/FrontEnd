import React from "react";
import welcomePageCover from "../../images/welcomePageCover.jpg";
import "../../css/welcomePage.css";
import { useHistory } from "react-router";
import shoppingCart from "../../images/shoppingCart.gif";
import searchTopic from "../../images/searchTopic.jpg";
import sell from "../../images/sell.jpg";
import comment from "../../images/comment.jpg";
import stock from "../../images/stock.jpg";

const WelcomePage = () => {
  const history = useHistory();
  const goShop = () => {
    history.push("/shop");
  };

  return (
    <div className="welcomePageContainer">
      <div>
        <div className="welcomeHeader" onClick={goShop}>
          welcome to onlinelnwshop
        </div>
        <div className="startButtonContainer">
          <div className="startButton" onClick={goShop}>
            START
          </div>
        </div>
        <img
          src={welcomePageCover}
          className="welcomeCover"
          alt="welcomeCover"
        />
      </div>

      <div className="allWelcomeTopicContainer">
        <div className="welcomeTopicContainer">
          <img src={shoppingCart} className="imageTopic" alt="topic1" />{" "}
          <div className="contentTopic">
            <div className="headerTopic">เว็บไซต์นี้คือเว็บไซต์อะไร ?</div>
            <div style={{maxWidth:'650px'}}>
              เป็นเว็บไซต์สำหรับซื้อขายสินค้า สำหรับทุกคน
              ไม่ว่าคุณจะสนใจเรื่องการขายสินค้าที่คุณมี
              หรือการซื้อสินค้าจากผู้อื่นพวกเราก็มีบริการรองรับสำหรับทุกคน
              ถ้าคุณสนใจแล้วก็อย่ารอช้า กดปุ่ม Start แล้วไปลุยกันเลย!~
            </div>
          </div>
        </div>

        <div className="optionTopic">
          <div>
            <img src={searchTopic} alt="searchWelcome" />
            <div className="headerTopic"> การค้นหาสินค้า</div>
            คุณสามารถค้นหาสินค้าที่ต้องการผ่านช่องทางต่างๆในการค้นหาซึ่งจะช่วยให้คุณเจอสินค้าที่ต้องการได้ง่ายขึ้น
          </div>

          <div>
            <img src={comment} alt="searchWelcome" />
            <div className="headerTopic"> การแสดงความคิดเห็นต่อสินค้า</div>
            คุณสามารถแสดงความเห็นต่อสินค้าที่คุณได้ซื้อ
            เพื่อแนะนำผู้อื่นที่จะมาซื้อบ้างและช่วยให้การตัดสินใจในการซื้อของคุณง่ายขึ้น
          </div>

          <div>
            <img src={sell} alt="searchWelcome" />
            <div className="headerTopic"> การขายสินค้ากับเรา</div>
            ทุกคนสามารถมาขายสินค้ากับเราได้ ถ้าหากคุณสนใจจะขายสินค้ากับเรา
            สามารถสมัครบัญชีและขอเป็นผู้ขายบนเว็บไซต์ของเราได้เลย
          </div>

          <div>
            <img src={stock} alt="searchWelcome" />
            <div className="headerTopic"> ตรวจสอบสินค้าของคุณ</div>
            เมื่อคุณเป็นผู้ขายกับเราแล้ว
            จะสามารถตรวจสอบสินค้าทั้งหมดที่คุณวางขาย
            และสามารถดูประวัติการขายของสินค้าของคุณได้ด้วย
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;