{
    energieip.UpdateLedCfg = function (dled) {
        var url = energieip.weblink + 'setup/led';
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            }
        }
        var content = {
            "mac": dled.mac,
            "group": parseInt(dled.group),
            "friendlyName": dled.friendlyName,
        };
        xhr.send(JSON.stringify(content));
    }

    energieip.SendLedCmd = function (dled) {
        var url = energieip.weblink + 'command/led';
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            }
        }
        var content = {
            "mac": dled.mac,
            "auto": dled.auto,
            "setpoint": parseInt(dled.setpoint),
        };
        xhr.send(JSON.stringify(content));
    }

    energieip.Led = class led extends energieip.Driver {
        get type() {
            return "energieip.Led";
        }
 
        init(driverObj) {
            super.init(driverObj);
            this.default_color = "xeogl-annotation-pin-led";
            
            this._deviceType = "Led";
            this._typeElement.innerHTML = this._deviceType;

            this._spot.className = this.default_color;

            this._setpointElement = document.createElement('div');
            this._setpointElement.className = "xeogl-annotation-group";

            this._label.appendChild(this._setpointElement);

            this.auto = driverObj.auto
            this.setpoint = driverObj.setpoint
        }

        set auto(val) {
            if (this._auto === val) {
                return;
            }
            this._auto = val;
            this.fire("auto", this);
        }

        get auto() {
            return this._auto;
        }

        set setpoint(val) {
            if (this._setpoint === val) {
                return;
            }

            this._setpoint = val || "0";
            this._setpointElement.innerHTML = "Percentage: " + this._setpoint + " %";
            this.fire("setpoint", this);
        }

        get setpoint() {
            return this._setpoint;
        }

        set error(val) {
            if (this._error === val) {
                return;
            }
            this._error = val;
            if (this._error != 0) {
                this._spot.className = this.error_color;
            } else {
                this._spot.className = this.default_color;
            }
            this.fire("error", this);
        }

        get error() {
            return this._error;
        }

    };

    energieip.LedSupervision = class ledSupervision extends energieip.Led {
        get type() {
            return "energieip.Led";
        }

        init(driverObj) {
            super.init(driverObj);
        }
    };

    energieip.LedMaintenance = class ledMaintenance extends energieip.Led {
        get type() {
            return "energieip.Led";
        }

        init(driverObj) {
            super.init(driverObj);
            this._label.appendChild(this._macElement);
            this._label.appendChild(this._ipElement);
        }
    };
}