import {Area} from "../models/index";

const index = async(req,res) => {
    const areas = await Area.findAll();
    res.render("area/index",{
        areas: areas.map((area) => area.toJSON())
    });
}

export default { index };