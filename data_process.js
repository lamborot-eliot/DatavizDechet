async function load_data() {

	var services = {};
	var dechets = {};
	var data = {
		"Total_dechets": 0
	};
	let data_ = await d3.csv("https://koumoul.com/s/data-fair/api/v1/datasets/sinoe-(r)-destination-des-dechets-collectes-en-decheterie-par-type-de-traitement/full");
	for (o of data_) {
		if (parseInt(o.C_REGION) == 97 || parseInt(o.C_REGION) == 94) continue;


		if (!(o.C_REGION in data)) {
			data[o.C_REGION] = {
				"name": o.L_REGION,
				"services": {},
				"Total_dechets": 0,
				"get_name": function () { return this.name },
				"get_total_dechets": function () { return this.Total_dechets },
				"get_year": function (year) { return this[year] }
			};
		}

		if (!(o.ANNEE in data)) {
			data[o.ANNEE] = {};
			data[o.ANNEE].get_total_dechets = function () { return this.Total_dechets };
			data[o.ANNEE]["get_service"] = function (service) { return this.services[service] };
			data[o.ANNEE]["get_dechet"] = function (dechet) { return this[dechet]["Total_dechets"] };
			data[o.ANNEE]["Total_dechets"] = 0;
			data[o.ANNEE]["services"] = {};
		}

		if (!(o.ANNEE in data[o.C_REGION])) {
			data[o.C_REGION][o.ANNEE] = { "get_total_dechets": function () { return this.Total_dechets } };
			data[o.C_REGION][o.ANNEE]["Total_dechets"] = 0;
			data[o.C_REGION][o.ANNEE]["services"] = {};
			data[o.C_REGION][o.ANNEE]["get_service"] = function (service) { return this.services[service] };
			data[o.C_REGION][o.ANNEE]["get_dechet"] = function (dechet) { return this[dechet]["Total_dechets"] };
		}

		if (!(o.C_TYP_REG_DECHET in data[o.C_REGION])) {
			data[o.C_REGION][o.C_TYP_REG_DECHET] = {};
			data[o.C_REGION][o.C_TYP_REG_DECHET]["Total_dechets"] = 0;
			data[o.C_REGION][o.C_TYP_REG_DECHET]["services"] = {};
		}

		if (!(o.C_TYP_REG_DECHET in data[o.C_REGION][o.ANNEE])) {
			data[o.C_REGION][o.ANNEE][o.C_TYP_REG_DECHET] = {};
			data[o.C_REGION][o.ANNEE][o.C_TYP_REG_DECHET]["services"] = {};
			data[o.C_REGION][o.ANNEE][o.C_TYP_REG_DECHET]["Total_dechets"] = 0;
		}

		if (!(o.C_TYP_REG_DECHET in data[o.ANNEE])) {
			data[o.ANNEE][o.C_TYP_REG_DECHET] = {};
			data[o.ANNEE][o.C_TYP_REG_DECHET]["services"] = {};
			data[o.ANNEE][o.C_TYP_REG_DECHET]["Total_dechets"] = 0;

		}

		if (!(o.C_TYP_REG_SERVICE in data[o.ANNEE][o.C_TYP_REG_DECHET]["services"])) {
			data[o.ANNEE][o.C_TYP_REG_DECHET]["services"][o.C_TYP_REG_SERVICE] = 0;
		}

		if (!(o.C_TYP_REG_SERVICE in data[o.C_REGION][o.ANNEE][o.C_TYP_REG_DECHET]["services"])) {
			data[o.C_REGION][o.ANNEE][o.C_TYP_REG_DECHET]["services"][o.C_TYP_REG_SERVICE] = 0;
		}

		if (!(o.C_TYP_REG_SERVICE in data[o.C_REGION][o.C_TYP_REG_DECHET]["services"])) {
			data[o.C_REGION][o.C_TYP_REG_DECHET]["services"][o.C_TYP_REG_SERVICE] = 0;
		}

		if (!(o.C_TYP_REG_SERVICE in data[o.C_REGION][o.ANNEE]["services"])) {
			data[o.C_REGION][o.ANNEE]["services"][o.C_TYP_REG_SERVICE] = 0;
		}

		if (!(o.C_TYP_REG_SERVICE in data[o.ANNEE]["services"])) {
			data[o.ANNEE]["services"][o.C_TYP_REG_SERVICE] = 0;
		}

		if (!(o.C_TYP_REG_SERVICE in data[o.C_REGION]["services"])) {
			data[o.C_REGION]["services"][o.C_TYP_REG_SERVICE] = 0;
		}

		var dechet_add = parseFloat(o.TONNAGE_DECH);
		data[o.C_REGION]["services"][o.C_TYP_REG_SERVICE] += dechet_add;
		data[o.ANNEE]["services"][o.C_TYP_REG_SERVICE] += dechet_add;
		data[o.C_REGION][o.ANNEE]["services"][o.C_TYP_REG_SERVICE] += dechet_add;
		data[o.C_REGION][o.C_TYP_REG_DECHET]["services"][o.C_TYP_REG_SERVICE] += dechet_add;
		data[o.C_REGION][o.ANNEE][o.C_TYP_REG_DECHET]["services"][o.C_TYP_REG_SERVICE] += dechet_add;
		data[o.ANNEE][o.C_TYP_REG_DECHET]["services"][o.C_TYP_REG_SERVICE] += dechet_add;
		data[o.ANNEE][o.C_TYP_REG_DECHET]["Total_dechets"] += dechet_add;
		data[o.C_REGION][o.ANNEE][o.C_TYP_REG_DECHET]["Total_dechets"] += dechet_add;
		data[o.C_REGION][o.C_TYP_REG_DECHET]["Total_dechets"] += dechet_add;
		data[o.ANNEE]["Total_dechets"] += dechet_add;
		data[o.C_REGION][o.ANNEE]["Total_dechets"] += dechet_add;
		data[o.C_REGION]["Total_dechets"] += dechet_add;
		data[o.ANNEE]["Total_dechets"] += dechet_add;
		data["Total_dechets"] += dechet_add;

		if (!(o.C_TYP_REG_DECHET in dechets)) {
			dechets[o.C_TYP_REG_DECHET] = o.L_TYP_REG_DECHET;
		}

		if (!(o.C_TYP_REG_SERVICE in services)) {
			services[o.C_TYP_REG_SERVICE] = o.L_TYP_REG_SERVICE;
		}

	}
	data.services = services;
	data.dechets = dechets;
	// FUNCTIONS 
	data.get_total_dechets = function () { return this.Total_dechets };
	data.get_region_list = function () { return [11, 24, 27, 28, 32, 44, 52, 53, 75, 76, 84, 93] };
	data.get_year_list = function () { return [2009, 2011, 2013, 2015, 2017] };
	data.get_region = function (region) {
		if (region === undefined) return {
			11: this[11],
			24: this[24],
			27: this[27],
			28: this[28],
			32: this[32],
			44: this[44],
			52: this[52],
			53: this[53],
			75: this[75],
			76: this[76],
			84: this[84],
			93: this[93]
		}
		else return this[region];
	};
	data.get_year = function (year) { return this[year] };
	data.get_type_dechets = function () { return this.dechets };
	data.get_type_services = function () { return this.services };
	data.get_name_region = function () {
		return {
			11: "Ile-de-France",
			24: "Centre-Val de Loire",
			27: "Bourgogne-Franche-Comté",
			28: "Normandie",
			32: "Hauts-de-France",
			44: "Grand-Est",
			52: "Pays de la Loire",
			53: "Bretagne",
			75: "Nouvelle-Aquitaine",
			76: "Occitanie",
			84: "Auvergne-Rhône-Alpes",
			93: "PACA"

		};

	};

	data.get_name_region_string = function () {
		return ["Ile-de-France",
			"Centre-Val de Loire",
			"Bourgogne-Franche-Comté",
			"Normandie",
			"Hauts-de-France",
			"Grand-Est",
			"Pays de la Loire",
			"Bretagne",
			"Nouvelle-Aquitaine",
			"Occitanie",
			"Auvergne-Rhône-Alpes",
			"PACA"];
	};


	console.log(data.get_region(11).get_year(2009).get_dechet("02B"));
	return data;
}