import { Schema, model } from 'mongoose';

const memberSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  membership: { type: String, required: true },
  phonenumber: { type: String, required: true },
  monthsOfMemberShips: { type: Number, required: true },
  startDate: { type: Date, default: Date.now, required: true },
  endDate: { type: Date, required: true },
  paidAmount: { type: Number, required: true, default: 0 },
  photo: { type: String, default: "" },
}, {
  timestamps: true,
  collection: "gymdatabase",
  toObject: {
    virtuals: true,
    versionKey: false,
    transform: function (_, ret) {
      ret._id = ret._id.toString();
      return ret;
    }
  },
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function (_, ret) {
      ret._id = ret._id.toString();
      return ret;
    }
  }
});

memberSchema.virtual('daysLeft').get(function () {
  const now = new Date();
  const end = new Date(this.endDate);
  const diffTime = end - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

const Member = model('Member', memberSchema, 'members');
export default Member;
