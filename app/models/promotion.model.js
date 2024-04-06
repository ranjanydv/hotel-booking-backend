const promotionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    discount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Promotion", promotionSchema);
