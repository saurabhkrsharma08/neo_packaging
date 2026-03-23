import mongoose from 'mongoose';

const AboutSchema = new mongoose.Schema({
  title: String,
  content: String,
  metaTitle: {
    type: String,
    required: true,
    default: "Best Quality Conveyors manufacturer in India | Neo Conveyors" // Default value if not provided
  },
  metaDescription: {
    type: String,
    required: true,
    default: "Neo Conveyors, best quality conveyors manufacturer in India, industrial conveyors system manufacturer since 2007. Best quality conveyors manufacturer in India, Number one in conveyors manufacturing Delhi India, Top conveyors manufacturer in Ghaziabad U.P India, quality conveyors manufacturer suppliers exporters India" // Default value
  },
  metaKeywords: {
    type: String,
    required: true,
    default: "conveyor manufacturer,horizontal belt conveyor,assembly line conveyor,best quality conveyors manufacturer in india,number one in conveyors manufacturing delhi india,top conveyors manufacturer in ghaziabad u.p india,quality conveyors manufacturer suppliers exporters in india" // Default value
  },
});

export default mongoose.models.About || mongoose.model('About', AboutSchema);