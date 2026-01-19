# app/services/soil_service.py
import httpx
from typing import Dict, Any, Optional
from app.core.config import settings

async def call_soilgrids(lat: float, lon: float) -> Dict[str, Any]:
    """Call SoilGrids API."""
    url = settings.SOILGRIDS_URL
    params = {"lat": lat, "lon": lon}
    async with httpx.AsyncClient(timeout=30.0) as client:
        r = await client.get(url, params=params)
        r.raise_for_status()
        return r.json()

def _find_property(props: Dict[str, Any], key_candidates):
    for k in props.keys():
        lower = k.lower()
        for cand in key_candidates:
            if cand in lower:
                return props[k]
    return None

def extract_nutrients_from_soilgrids(raw: Dict[str, Any]) -> Dict[str, Optional[Any]]:
    props = raw.get("properties", {}) if isinstance(raw, dict) else {}
    result = {
        "nitrogen": None,
        "ph": None,
        "phosphorus": None,
        "potassium": None,
        "soil_type": None,
        "bulk_density": None,
        "organic_carbon": None,
        "other": {}
    }

    # pH
    ph_prop = _find_property(props, ["phh2o", "ph", "ph_h2o"])
    if ph_prop:
        try:
            if isinstance(ph_prop, dict):
                for container in ("M", "mean", "values"):
                    if container in ph_prop:
                        inner = ph_prop[container]
                        if isinstance(inner, dict):
                            for val in inner.values():
                                result["ph"] = float(val)
                                break
            else:
                result["ph"] = float(ph_prop)
        except:
            pass

    # Nitrogen
    n_prop = _find_property(props, ["nitrogen"])
    if n_prop:
        try:
            if isinstance(n_prop, dict):
                for container in ("M", "mean", "values"):
                    if container in n_prop:
                        inner = n_prop[container]
                        if isinstance(inner, dict):
                            for val in inner.values():
                                result["nitrogen"] = float(val)
                                break
            else:
                result["nitrogen"] = float(n_prop)
        except:
            pass

    # Bulk density
    bd_prop = _find_property(props, ["bulk", "bdod"])
    if bd_prop:
        try:
            if isinstance(bd_prop, dict):
                for container in ("M", "mean", "values"):
                    if container in bd_prop:
                        inner = bd_prop[container]
                        if isinstance(inner, dict):
                            for val in inner.values():
                                result["bulk_density"] = float(val)
                                break
            else:
                result["bulk_density"] = float(bd_prop)
        except:
            pass

    # Organic carbon
    oc_prop = _find_property(props, ["soc", "oc", "organic"])
    if oc_prop:
        try:
            if isinstance(oc_prop, dict):
                for container in ("M", "mean", "values"):
                    if container in oc_prop:
                        inner = oc_prop[container]
                        if isinstance(inner, dict):
                            for val in inner.values():
                                result["organic_carbon"] = float(val)
                                break
            else:
                result["organic_carbon"] = float(oc_prop)
        except:
            pass

    # Soil type (categorical class, not numeric)
    st_prop = _find_property(props, ["soiltype", "usda", "texture"])
    if st_prop:
        try:
            result["soil_type"] = str(st_prop)
        except:
            pass

    # Store everything else
    result["other"] = props
    return result
