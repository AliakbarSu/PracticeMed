export const design_html = ({
  questions
}: {
  questions: {
    text: string
    options: string[]
    correctOption: { alpha: string }
  }[]
}) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html
  data-editor-version="2"
  class="sg-campaigns"
  xmlns="http://www.w3.org/1999/xhtml"
>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
    />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <!--<![endif]-->
    <!--[if (gte mso 9)|(IE)]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
      <style type="text/css">
        body {
          width: 600px;
          margin: 0 auto;
        }
        table {
          border-collapse: collapse;
        }
        table,
        td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        img {
          -ms-interpolation-mode: bicubic;
        }
      </style>
    <![endif]-->
    <style type="text/css">
      body,
      p,
      div {
        font-family: inherit;
        font-size: 14px;
      }
      body {
        color: #000000;
      }
      body a {
        color: #1188e6;
        text-decoration: none;
      }
      p {
        margin: 0;
        padding: 0;
      }
      table.wrapper {
        width: 100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img.max-width {
        max-width: 100% !important;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      ul ul ul ul {
        list-style-type: disc !important;
      }
      ol ol {
        list-style-type: lower-roman !important;
      }
      ol ol ol {
        list-style-type: lower-latin !important;
      }
      ol ol ol ol {
        list-style-type: decimal !important;
      }
      @media screen and (max-width: 480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
          text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 100% !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        .social-icon-column {
          display: inline-block !important;
        }
      }
    </style>
    <!--user entered Head Start-->
    <link
      href="https://fonts.googleapis.com/css?family=Playfair+Display&display=swap"
      rel="stylesheet"
    />
    <style>
      body {
        font-family: 'Playfair Display', serif;
      }
    </style>
    <!--End Head user entered-->
  </head>
  <body>
    <center
      class="wrapper"
      data-link-color="#1188E6"
      data-body-style="font-size:14px; font-family:inherit; color:#000000; background-color:#FFFFFF;"
    >
      <div class="webkit">
        <table
          cellpadding="0"
          cellspacing="0"
          border="0"
          width="100%"
          class="wrapper"
          bgcolor="#FFFFFF"
        >
          <tr>
            <td valign="top" bgcolor="#FFFFFF" width="100%">
              <table
                width="100%"
                role="content-container"
                class="outer"
                align="center"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tr>
                  <td width="100%">
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                    >
                      <tr>
                        <td>
                          <!--[if mso]>
    <center>
    <table><tr><td width="600">
  <![endif]-->
                          <table
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                            style="width: 100%; max-width: 600px"
                            align="center"
                          >
                            <tr>
                              <td
                                role="modules-container"
                                style="
                                  padding: 0px 0px 0px 0px;
                                  color: #000000;
                                  text-align: left;
                                "
                                bgcolor="#FFFFFF"
                                width="100%"
                                align="left"
                              >
                                <table
                                  class="module preheader preheader-hide"
                                  role="module"
                                  data-type="preheader"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="
                                    display: none !important;
                                    mso-hide: all;
                                    visibility: hidden;
                                    opacity: 0;
                                    color: transparent;
                                    height: 0;
                                    width: 0;
                                  "
                                >
                                  <tr>
                                    <td role="module-content">
                                      <p></p>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  align="center"
                                  width="100%"
                                  role="module"
                                  data-type="columns"
                                  style="padding: 0px 0px 0px 0px"
                                  bgcolor="#fff5f9"
                                  data-distribution="1"
                                >
                                  <tbody>
                                    <tr role="module-content">
                                      <td height="100%" valign="top">
                                        <table
                                          width="580"
                                          style="
                                            width: 580px;
                                            border-spacing: 0;
                                            border-collapse: collapse;
                                            margin: 0px 10px 0px 10px;
                                          "
                                          cellpadding="0"
                                          cellspacing="0"
                                          align="left"
                                          border="0"
                                          bgcolor=""
                                          class="column column-0"
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style="
                                                  padding: 0px;
                                                  margin: 0px;
                                                  border-spacing: 0;
                                                "
                                              >
                                                <table
                                                  class="module"
                                                  role="module"
                                                  data-type="spacer"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="e5a6af02-de55-45d8-b3da-10c95eb9dd64"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 0px 0px 30px
                                                            0px;
                                                        "
                                                        role="module-content"
                                                        bgcolor=""
                                                      ></td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <table
                                                  class="module"
                                                  role="module"
                                                  data-type="spacer"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="43d44b96-6e1e-4936-987a-ad0856d74732"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 0px 0px 20px
                                                            0px;
                                                        "
                                                        role="module-content"
                                                        bgcolor=""
                                                      ></td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <table
                                                  class="module"
                                                  role="module"
                                                  data-type="text"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="83050002-1a90-4222-ab77-f872b9ea0369"
                                                  data-mc-module-version="2019-10-22"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 18px 30px
                                                            18px 30px;
                                                          line-height: 32px;
                                                          text-align: inherit;
                                                        "
                                                        height="100%"
                                                        valign="top"
                                                        bgcolor=""
                                                        role="module-content"
                                                      >
                                                        <div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: center;
                                                            "
                                                          >
                                                            <span
                                                              style="
                                                                color: #1a3b40;
                                                                font-size: 42px;
                                                                font-family: helvetica,
                                                                  sans-serif;
                                                              "
                                                              ><strong
                                                                >Recalls of the
                                                                Day</strong
                                                              ></span
                                                            >
                                                          </div>
                                                          <div></div>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <table
                                                  class="module"
                                                  role="module"
                                                  data-type="text"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="7fd0bc8b-6587-44d6-b782-d76316d10523"
                                                  data-mc-module-version="2019-10-22"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 18px 35px
                                                            18px 35px;
                                                          line-height: 22px;
                                                          text-align: inherit;
                                                        "
                                                        height="100%"
                                                        valign="top"
                                                        bgcolor=""
                                                        role="module-content"
                                                      >
                                                        <div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                            "
                                                          >
                                                            <span
                                                              style="
                                                                color: #000000;
                                                                font-size: 18px;
                                                                font-family: helvetica,
                                                                  sans-serif;
                                                              "
                                                              ><strong
                                                                >Question 1</strong
                                                              ></span
                                                            >
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                            "
                                                          >
                                                            <br />
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: left;
                                                            "
                                                          >
                                                            <span
                                                              style="
                                                                color: #000000;
                                                                font-family: arial,
                                                                  helvetica,
                                                                  sans-serif;
                                                                font-size: 14px;
                                                              "
                                                              >${
                                                                questions[0]
                                                                  .text
                                                              }</span
                                                            >
                                                          </div>
                                                          <div></div>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <table
                                                  class="module"
                                                  role="module"
                                                  data-type="text"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="5331b91a-981e-4f56-b1a8-eea8a89598f4"
                                                  data-mc-module-version="2019-10-22"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 18px 50px
                                                            18px 55px;
                                                          line-height: 22px;
                                                          text-align: inherit;
                                                        "
                                                        height="100%"
                                                        valign="top"
                                                        bgcolor=""
                                                        role="module-content"
                                                      >
                                                        <div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                            "
                                                          >
                                                            <span
                                                              style="
                                                                font-family: helvetica,
                                                                  sans-serif;
                                                              "
                                                              ><strong
                                                                >A - ${
                                                                  questions[0]
                                                                    .options[0]
                                                                }</strong
                                                              ></span
                                                            >
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                            "
                                                          >
                                                            <br />
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: left;
                                                            "
                                                          >
                                                            <span
                                                              style="
                                                                font-family: helvetica,
                                                                  sans-serif;
                                                              "
                                                              ><strong
                                                                >B - ${
                                                                  questions[0]
                                                                    .options[1]
                                                                }</strong
                                                              ></span
                                                            >
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: left;
                                                            "
                                                          >
                                                            <br />
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: left;
                                                            "
                                                          >
                                                            <span
                                                              style="
                                                                font-family: helvetica,
                                                                  sans-serif;
                                                              "
                                                              ><strong
                                                                >C - ${
                                                                  questions[0]
                                                                    .options[2]
                                                                }</strong
                                                              ></span
                                                            >
                                                          </div>
                                                          <div></div>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <table
                                                  class="module"
                                                  role="module"
                                                  data-type="text"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="7fd0bc8b-6587-44d6-b782-d76316d10523.1"
                                                  data-mc-module-version="2019-10-22"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 18px 35px
                                                            18px 35px;
                                                          line-height: 22px;
                                                          text-align: inherit;
                                                        "
                                                        height="100%"
                                                        valign="top"
                                                        bgcolor=""
                                                        role="module-content"
                                                      >
                                                        <div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: start;
                                                            "
                                                          >
                                                            <br />
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                              margin-left: 0px;
                                                            "
                                                          >
                                                            <span
                                                              style="
                                                                box-sizing: border-box;
                                                                padding-top: 0px;
                                                                padding-right: 0px;
                                                                padding-bottom: 0px;
                                                                padding-left: 0px;
                                                                margin-top: 0px;
                                                                margin-right: 0px;
                                                                margin-bottom: 0px;
                                                                margin-left: 0px;
                                                                font-style: inherit;
                                                                font-variant-ligatures: inherit;
                                                                font-variant-caps: inherit;
                                                                font-variant-numeric: inherit;
                                                                font-variant-east-asian: inherit;
                                                                font-variant-alternates: inherit;
                                                                font-weight: bold;
                                                                font-stretch: inherit;
                                                                line-height: inherit;
                                                                font-optical-sizing: inherit;
                                                                font-kerning: inherit;
                                                                font-feature-settings: inherit;
                                                                font-variation-settings: inherit;
                                                                vertical-align: baseline;
                                                                border-top-width: 0px;
                                                                border-right-width: 0px;
                                                                border-bottom-width: 0px;
                                                                border-left-width: 0px;
                                                                border-top-style: initial;
                                                                border-right-style: initial;
                                                                border-bottom-style: initial;
                                                                border-left-style: initial;
                                                                border-top-color: initial;
                                                                border-right-color: initial;
                                                                border-bottom-color: initial;
                                                                border-left-color: initial;
                                                                border-image-source: initial;
                                                                border-image-slice: initial;
                                                                border-image-width: initial;
                                                                border-image-outset: initial;
                                                                border-image-repeat: initial;
                                                                letter-spacing: normal;
                                                                orphans: 2;
                                                                text-align: start;
                                                                text-indent: 0px;
                                                                text-transform: none;
                                                                widows: 2;
                                                                word-spacing: 0px;
                                                                -webkit-text-stroke-width: 0px;
                                                                background-color: rgb(
                                                                  255,
                                                                  245,
                                                                  249
                                                                );
                                                                text-decoration-thickness: initial;
                                                                text-decoration-style: initial;
                                                                text-decoration-color: initial;
                                                                color: #000000;
                                                                font-size: 18px;
                                                                font-family: helvetica,
                                                                  sans-serif;
                                                              "
                                                              >Question 2</span
                                                            >
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                              margin-left: 0px;
                                                            "
                                                          >
                                                            <br />
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                            "
                                                          >
                                                            <span
                                                              style="
                                                                font-family: helvetica,
                                                                  sans-serif;
                                                              "
                                                              >${
                                                                questions[1]
                                                                  .text
                                                              }</span
                                                            >
                                                          </div>
                                                          <div></div>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <table
                                                  class="module"
                                                  role="module"
                                                  data-type="text"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="5331b91a-981e-4f56-b1a8-eea8a89598f4.1"
                                                  data-mc-module-version="2019-10-22"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 18px 50px
                                                            18px 55px;
                                                          line-height: 22px;
                                                          text-align: inherit;
                                                        "
                                                        height="100%"
                                                        valign="top"
                                                        bgcolor=""
                                                        role="module-content"
                                                      >
                                                        <div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                              font-weight: bold;
                                                            "
                                                          >
                                                            <span
                                                              style="
                                                                font-family: helvetica,
                                                                  sans-serif;
                                                              "
                                                              ><strong
                                                                >A - ${
                                                                  questions[1]
                                                                    .options[0]
                                                                }</strong
                                                              ></span
                                                            >
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                              font-weight: bold;
                                                            "
                                                          >
                                                            <br />
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                              font-weight: bold;
                                                            "
                                                          >
                                                            <span
                                                              style="
                                                                font-family: helvetica,
                                                                  sans-serif;
                                                              "
                                                              ><strong
                                                                >B - ${
                                                                  questions[1]
                                                                    .options[1]
                                                                }</strong
                                                              ></span
                                                            >
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                              font-weight: bold;
                                                            "
                                                          >
                                                            <br />
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                              font-weight: bold;
                                                            "
                                                          >
                                                            <span
                                                              style="
                                                                font-family: helvetica,
                                                                  sans-serif;
                                                              "
                                                              ><strong
                                                                >C - ${
                                                                  questions[1]
                                                                    .options[2]
                                                                }</strong
                                                              ></span
                                                            >
                                                          </div>
                                                          <div></div>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <table
                                                  class="module"
                                                  role="module"
                                                  data-type="text"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="7fd0bc8b-6587-44d6-b782-d76316d10523.1.1"
                                                  data-mc-module-version="2019-10-22"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 18px 35px
                                                            18px 35px;
                                                          line-height: 22px;
                                                          text-align: inherit;
                                                        "
                                                        height="100%"
                                                        valign="top"
                                                        bgcolor=""
                                                        role="module-content"
                                                      >
                                                        <div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: start;
                                                            "
                                                          >
                                                            <br />
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                              margin-left: 0px;
                                                            "
                                                          >
                                                            <span
                                                              style="
                                                                box-sizing: border-box;
                                                                padding-top: 0px;
                                                                padding-right: 0px;
                                                                padding-bottom: 0px;
                                                                padding-left: 0px;
                                                                margin-top: 0px;
                                                                margin-right: 0px;
                                                                margin-bottom: 0px;
                                                                margin-left: 0px;
                                                                font-style: inherit;
                                                                font-variant-ligatures: inherit;
                                                                font-variant-caps: inherit;
                                                                font-variant-numeric: inherit;
                                                                font-variant-east-asian: inherit;
                                                                font-variant-alternates: inherit;
                                                                font-weight: bold;
                                                                font-stretch: inherit;
                                                                line-height: inherit;
                                                                font-optical-sizing: inherit;
                                                                font-kerning: inherit;
                                                                font-feature-settings: inherit;
                                                                font-variation-settings: inherit;
                                                                vertical-align: baseline;
                                                                border-top-width: 0px;
                                                                border-right-width: 0px;
                                                                border-bottom-width: 0px;
                                                                border-left-width: 0px;
                                                                border-top-style: initial;
                                                                border-right-style: initial;
                                                                border-bottom-style: initial;
                                                                border-left-style: initial;
                                                                border-top-color: initial;
                                                                border-right-color: initial;
                                                                border-bottom-color: initial;
                                                                border-left-color: initial;
                                                                border-image-source: initial;
                                                                border-image-slice: initial;
                                                                border-image-width: initial;
                                                                border-image-outset: initial;
                                                                border-image-repeat: initial;
                                                                letter-spacing: normal;
                                                                orphans: 2;
                                                                text-align: start;
                                                                text-indent: 0px;
                                                                text-transform: none;
                                                                widows: 2;
                                                                word-spacing: 0px;
                                                                -webkit-text-stroke-width: 0px;
                                                                background-color: rgb(
                                                                  255,
                                                                  245,
                                                                  249
                                                                );
                                                                text-decoration-thickness: initial;
                                                                text-decoration-style: initial;
                                                                text-decoration-color: initial;
                                                                color: #000000;
                                                                font-size: 18px;
                                                                font-family: helvetica,
                                                                  sans-serif;
                                                              "
                                                              >Question 3</span
                                                            >
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                              margin-left: 0px;
                                                            "
                                                          >
                                                            <br />
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                            "
                                                          >
                                                            <span
                                                              style="
                                                                font-family: helvetica,
                                                                  sans-serif;
                                                              "
                                                              >${
                                                                questions[2]
                                                                  .text
                                                              }</span
                                                            >
                                                          </div>
                                                          <div></div>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <table
                                                  class="module"
                                                  role="module"
                                                  data-type="text"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="5331b91a-981e-4f56-b1a8-eea8a89598f4.1.1"
                                                  data-mc-module-version="2019-10-22"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 18px 50px
                                                            18px 55px;
                                                          line-height: 22px;
                                                          text-align: inherit;
                                                        "
                                                        height="100%"
                                                        valign="top"
                                                        bgcolor=""
                                                        role="module-content"
                                                      >
                                                        <div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                              font-weight: bold;
                                                            "
                                                          >
                                                            <span
                                                              style="
                                                                font-family: helvetica,
                                                                  sans-serif;
                                                              "
                                                              ><strong
                                                                >A - ${
                                                                  questions[2]
                                                                    .options[0]
                                                                }</strong
                                                              ></span
                                                            >
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                              font-weight: bold;
                                                            "
                                                          >
                                                            <br />
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                              font-weight: bold;
                                                            "
                                                          >
                                                            <span
                                                              style="
                                                                font-family: helvetica,
                                                                  sans-serif;
                                                              "
                                                              ><strong
                                                                >B - ${
                                                                  questions[2]
                                                                    .options[1]
                                                                }</strong
                                                              ></span
                                                            >
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                              font-weight: bold;
                                                            "
                                                          >
                                                            <br />
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                              font-weight: bold;
                                                            "
                                                          >
                                                            <span
                                                              style="
                                                                font-family: helvetica,
                                                                  sans-serif;
                                                              "
                                                              ><strong
                                                                >C - ${
                                                                  questions[2]
                                                                    .options[2]
                                                                }</strong
                                                              ></span
                                                            >
                                                          </div>
                                                          <div></div>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <table
                                                  class="module"
                                                  role="module"
                                                  data-type="spacer"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="cf7f81b1-1636-43ff-93f8-17249de0a0d4"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 0px 0px 2px
                                                            0px;
                                                        "
                                                        role="module-content"
                                                        bgcolor="#ffffff"
                                                      ></td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <table
                                                  class="module"
                                                  role="module"
                                                  data-type="text"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="7fd0bc8b-6587-44d6-b782-d76316d10523.1.1.1"
                                                  data-mc-module-version="2019-10-22"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 18px 35px
                                                            18px 35px;
                                                          line-height: 22px;
                                                          text-align: inherit;
                                                        "
                                                        height="100%"
                                                        valign="top"
                                                        bgcolor=""
                                                        role="module-content"
                                                      >
                                                        <div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: start;
                                                            "
                                                          >
                                                            <br />
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                              margin-left: 0px;
                                                            "
                                                          >
                                                            <span
                                                              style="
                                                                box-sizing: border-box;
                                                                padding-top: 0px;
                                                                padding-right: 0px;
                                                                padding-bottom: 0px;
                                                                padding-left: 0px;
                                                                margin-top: 0px;
                                                                margin-right: 0px;
                                                                margin-bottom: 0px;
                                                                margin-left: 0px;
                                                                font-style: inherit;
                                                                font-variant-ligatures: inherit;
                                                                font-variant-caps: inherit;
                                                                font-variant-numeric: inherit;
                                                                font-variant-east-asian: inherit;
                                                                font-variant-alternates: inherit;
                                                                font-weight: bold;
                                                                font-stretch: inherit;
                                                                line-height: inherit;
                                                                font-optical-sizing: inherit;
                                                                font-kerning: inherit;
                                                                font-feature-settings: inherit;
                                                                font-variation-settings: inherit;
                                                                vertical-align: baseline;
                                                                border-top-width: 0px;
                                                                border-right-width: 0px;
                                                                border-bottom-width: 0px;
                                                                border-left-width: 0px;
                                                                border-top-style: initial;
                                                                border-right-style: initial;
                                                                border-bottom-style: initial;
                                                                border-left-style: initial;
                                                                border-top-color: initial;
                                                                border-right-color: initial;
                                                                border-bottom-color: initial;
                                                                border-left-color: initial;
                                                                border-image-source: initial;
                                                                border-image-slice: initial;
                                                                border-image-width: initial;
                                                                border-image-outset: initial;
                                                                border-image-repeat: initial;
                                                                letter-spacing: normal;
                                                                orphans: 2;
                                                                text-align: start;
                                                                text-indent: 0px;
                                                                text-transform: none;
                                                                widows: 2;
                                                                word-spacing: 0px;
                                                                -webkit-text-stroke-width: 0px;
                                                                background-color: rgb(
                                                                  255,
                                                                  245,
                                                                  249
                                                                );
                                                                text-decoration-thickness: initial;
                                                                text-decoration-style: initial;
                                                                text-decoration-color: initial;
                                                                color: #000000;
                                                                font-size: 18px;
                                                                font-family: helvetica,
                                                                  sans-serif;
                                                              "
                                                              >Answers</span
                                                            >
                                                          </div>
                                                          <div></div>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <table
                                                  class="module"
                                                  role="module"
                                                  data-type="text"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="5331b91a-981e-4f56-b1a8-eea8a89598f4.1.1.1"
                                                  data-mc-module-version="2019-10-22"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 18px 50px
                                                            18px 55px;
                                                          line-height: 22px;
                                                          text-align: inherit;
                                                        "
                                                        height="100%"
                                                        valign="top"
                                                        bgcolor=""
                                                        role="module-content"
                                                      >
                                                        <div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                            "
                                                          >
                                                            <span
                                                              style="
                                                                font-family: helvetica,
                                                                  sans-serif;
                                                              "
                                                              ><strong
                                                                >Q1 -
                                                              </strong></span
                                                            ><span
                                                              style="
                                                                caret-color: rgb(
                                                                  0,
                                                                  0,
                                                                  0
                                                                );
                                                                color: #000000;
                                                                font-family: helvetica,
                                                                  sans-serif;
                                                                font-size: 14px;
                                                                font-style: normal;
                                                                font-variant-caps: normal;
                                                                font-weight: 700;
                                                                letter-spacing: normal;
                                                                text-align: start;
                                                                text-indent: 0px;
                                                                text-transform: none;
                                                                white-space: pre-wrap;
                                                                word-spacing: 0px;
                                                                -webkit-text-stroke-width: 0px;
                                                                background-color: rgb(
                                                                  255,
                                                                  245,
                                                                  249
                                                                );
                                                                text-decoration-line: none;
                                                                float: none;
                                                                display: inline;
                                                              "
                                                              >${questions[0].correctOption.alpha.toUpperCase()}</span
                                                            >
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                            "
                                                          >
                                                            <br />
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                            "
                                                          >
                                                            <span
                                                              style="
                                                                font-family: helvetica,
                                                                  sans-serif;
                                                              "
                                                              ><strong
                                                                >Q2 -
                                                              </strong></span
                                                            ><span
                                                              style="
                                                                caret-color: rgb(
                                                                  0,
                                                                  0,
                                                                  0
                                                                );
                                                                color: #000000;
                                                                font-family: helvetica,
                                                                  sans-serif;
                                                                font-size: 14px;
                                                                font-style: normal;
                                                                font-variant-caps: normal;
                                                                font-weight: 700;
                                                                letter-spacing: normal;
                                                                text-align: start;
                                                                text-indent: 0px;
                                                                text-transform: none;
                                                                white-space: pre-wrap;
                                                                word-spacing: 0px;
                                                                -webkit-text-stroke-width: 0px;
                                                                background-color: rgb(
                                                                  255,
                                                                  245,
                                                                  249
                                                                );
                                                                text-decoration-line: none;
                                                                float: none;
                                                                display: inline;
                                                              "
                                                              >${questions[1].correctOption.alpha.toUpperCase()}</span
                                                            >
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                            "
                                                          >
                                                            <br />
                                                          </div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: inherit;
                                                              font-weight: bold;
                                                            "
                                                          >
                                                            <span
                                                              style="
                                                                font-family: helvetica,
                                                                  sans-serif;
                                                              "
                                                              ><strong
                                                                >Q3 - ${questions[2].correctOption.alpha.toUpperCase()}</strong
                                                              ></span
                                                            >
                                                          </div>
                                                          <div></div>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  align="center"
                                  width="100%"
                                  role="module"
                                  data-type="columns"
                                  style="padding: 0px 0px 0px 0px"
                                  bgcolor="#fff5f9"
                                  data-distribution="1"
                                >
                                  <tbody>
                                    <tr role="module-content">
                                      <td height="100%" valign="top">
                                        <table
                                          width="580"
                                          style="
                                            width: 580px;
                                            border-spacing: 0;
                                            border-collapse: collapse;
                                            margin: 0px 10px 0px 10px;
                                          "
                                          cellpadding="0"
                                          cellspacing="0"
                                          align="left"
                                          border="0"
                                          bgcolor=""
                                          class="column column-0"
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style="
                                                  padding: 0px;
                                                  margin: 0px;
                                                  border-spacing: 0;
                                                "
                                              >
                                                <table
                                                  class="module"
                                                  role="module"
                                                  data-type="spacer"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="74f1a3dc-acac-47db-bb65-d43c0d1bfe09"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 0px 0px 50px
                                                            0px;
                                                        "
                                                        role="module-content"
                                                        bgcolor=""
                                                      ></td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <table
                                                  class="module"
                                                  role="module"
                                                  data-type="text"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="64438e8e-5f87-422f-83f5-76cfe0f24ed8"
                                                  data-mc-module-version="2019-10-22"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 18px 35px
                                                            18px 35px;
                                                          line-height: 22px;
                                                          text-align: inherit;
                                                        "
                                                        height="100%"
                                                        valign="top"
                                                        bgcolor=""
                                                        role="module-content"
                                                      >
                                                        <div>
                                                          <div
                                                            style="
                                                              font-family: inherit;
                                                              text-align: center;
                                                            "
                                                          >
                                                            <span
                                                              style="
                                                                font-family: helvetica,
                                                                  sans-serif;
                                                              "
                                                              >Want to get
                                                              access to
                                                              thousands of such
                                                              questions and
                                                              receive meaningful
                                                              feedback?&nbsp;</span
                                                            >
                                                          </div>
                                                          <div></div>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <table
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  class="module"
                                                  data-role="module-button"
                                                  data-type="button"
                                                  role="module"
                                                  style="table-layout: fixed"
                                                  width="100%"
                                                  data-muid="28ab0ad8-08f1-45d6-91e0-938800f637e9"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        align="center"
                                                        bgcolor=""
                                                        class="outer-td"
                                                        style="
                                                          padding: 0px 0px 0px
                                                            0px;
                                                        "
                                                      >
                                                        <table
                                                          border="0"
                                                          cellpadding="0"
                                                          cellspacing="0"
                                                          class="wrapper-mobile"
                                                          style="
                                                            text-align: center;
                                                          "
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                align="center"
                                                                bgcolor="#562adb"
                                                                class="inner-td"
                                                                style="
                                                                  border-radius: 6px;
                                                                  font-size: 16px;
                                                                  text-align: center;
                                                                  background-color: inherit;
                                                                "
                                                              >
                                                                <a
                                                                  href="https://practicemed.org"
                                                                  style="
                                                                    background-color: #562adb;
                                                                    border: 0px
                                                                      solid
                                                                      #326ce1;
                                                                    border-color: #326ce1;
                                                                    border-radius: 6px;
                                                                    border-width: 0px;
                                                                    color: #ffffff;
                                                                    display: inline-block;
                                                                    font-size: 14px;
                                                                    font-weight: normal;
                                                                    letter-spacing: 0px;
                                                                    line-height: normal;
                                                                    padding: 12px
                                                                      18px 12px
                                                                      18px;
                                                                    text-align: center;
                                                                    text-decoration: none;
                                                                    border-style: solid;
                                                                    font-family: helvetica,
                                                                      sans-serif;
                                                                  "
                                                                  target="_blank"
                                                                  >Sign Up
                                                                  Now</a
                                                                >
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <table
                                                  class="wrapper"
                                                  role="module"
                                                  data-type="image"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="e315f9ab-122a-467e-8468-edc9e02d92d1"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          font-size: 6px;
                                                          line-height: 10px;
                                                          padding: 0px 0px 0px
                                                            0px;
                                                        "
                                                        valign="top"
                                                        align="center"
                                                      >
                                                        <img
                                                          class="max-width"
                                                          border="0"
                                                          style="
                                                            display: block;
                                                            color: #000000;
                                                            text-decoration: none;
                                                            font-family: Helvetica,
                                                              arial, sans-serif;
                                                            font-size: 16px;
                                                          "
                                                          width="100"
                                                          alt=""
                                                          data-proportionally-constrained="true"
                                                          data-responsive="false"
                                                          src="http://cdn.mcauto-images-production.sendgrid.net/e715b91adc4cff2b/fdd3aab6-2f89-4ae6-882f-a2a730b0ebf3/1080x1080.png"
                                                          height="100"
                                                        />
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <table
                                                  class="module"
                                                  role="module"
                                                  data-type="spacer"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="b68ff395-1534-4ad9-b0e6-3e29f1134162"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 0px 0px 30px
                                                            0px;
                                                        "
                                                        role="module-content"
                                                        bgcolor=""
                                                      ></td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div
                                  data-role="module-unsubscribe"
                                  class="module"
                                  role="module"
                                  data-type="unsubscribe"
                                  style="
                                    background-color: #fff5f9;
                                    color: #444444;
                                    font-size: 12px;
                                    line-height: 20px;
                                    padding: 16px 16px 16px 16px;
                                    text-align: Center;
                                  "
                                  data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"
                                >
                                  <div class="Unsubscribe--addressLine"></div>
                                  <p
                                    style="
                                      font-family: helvetica, sans-serif;
                                      font-size: 12px;
                                      line-height: 20px;
                                    "
                                  >
                                    <a
                                      class="Unsubscribe--unsubscribeLink"
                                      href="{{{unsubscribe}}}"
                                      target="_blank"
                                      style=""
                                      >Unsubscribe</a
                                    >
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
                            </center>
                            <![endif]-->
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>
`
