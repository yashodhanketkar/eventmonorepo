export const Admin = (req, res, next) => {
  try {
    console.log(req.body.user);
    if (req.body.user.role !== "admin") throw new Error("Permission denied.");
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
