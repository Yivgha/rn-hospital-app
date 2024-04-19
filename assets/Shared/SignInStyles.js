import Colors from "./Colors";

export default {
  pageBox: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: Colors.celestial,
    gap: 30,
  },
  textContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textColor: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: "appfont",
  },
  actionText: {
    fontFamily: "appfontSemibold",
    fontSize: 18,
    color: Colors.peach,
  },
  signInForm: {
    flexDirection: "column",
    gap: 10,
    backgroundColor: Colors.lightGray,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  inputForm: {
    borderRadius: 10,
    borderColor: Colors.gray,
    color: Colors.celestial,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: Colors.sky,
    fontFamily: "appfont",
  },
  buttonBox: {
    paddingVertical: 13,
    borderRadius: 90,
    alignItems: "center",
    width: 150,
    backgroundColor: Colors.black,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: "appfontLight",
  },
};
