const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  try {
    const { fullName, mobile, rank, studentClass } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: "🔥 New Student Lead",
      html: `
        Name: ${fullName}<br>
        Mobile: ${mobile}<br>
        Rank: ${rank}<br>
        Class: ${studentClass}
      `
    });

    res.status(200).json({
      success: true,
      message: "Submitted Successfully"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed"
    });
  }
};