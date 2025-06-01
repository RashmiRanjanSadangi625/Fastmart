const mongoose=require("mongoose")

const PaymentInformationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },
    paymentMethod: {
      type: String,
      required: true
    },
    paymentId: {
      type: String,
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: "INR"
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
);

const PaymentInformation = mongoose.model("PaymentInformation", PaymentInformationSchema);


module.exports=PaymentInformation;
