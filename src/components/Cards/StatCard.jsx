import { motion } from "framer-motion";

export default function StatCard({ title, value }) {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-2xl p-6 text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </motion.div>
  );
}
