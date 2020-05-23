"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.config = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactAutosuggest = _interopRequireDefault(require("react-autosuggest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var config = {
  css: {
    container: 'list-group',
    item: 'list-group-item list-group-item-action',
    activeItem: 'list-group-item list-group-item-action active'
  }
};
exports.config = config;

var RJSFAutosuggest = /*#__PURE__*/function (_React$Component) {
  _inherits(RJSFAutosuggest, _React$Component);

  var _super = _createSuper(RJSFAutosuggest);

  function RJSFAutosuggest() {
    var _this;

    _classCallCheck(this, RJSFAutosuggest);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      suggestions: []
    });

    _defineProperty(_assertThisInitialized(_this), "getSuggestionValue", function (s) {
      return s.label;
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event, _ref) {
      var newValue = _ref.newValue;
      return _this.props.onChange(newValue);
    });

    _defineProperty(_assertThisInitialized(_this), "onSuggestionsClearRequested", function () {
      var _this$props$schema$au = _this.props.schema.autosuggestProps,
          autosuggestProps = _this$props$schema$au === void 0 ? {} : _this$props$schema$au;

      if (!autosuggestProps.alwaysRenderSuggestions === 'DEBUG') {
        _this.setState({
          suggestions: []
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderSuggestionsContainer", function (_ref2) {
      var containerProps = _ref2.containerProps,
          children = _ref2.children;
      containerProps.className = config.css.container;
      return /*#__PURE__*/_react["default"].createElement("div", containerProps, children);
    });

    _defineProperty(_assertThisInitialized(_this), "renderSuggestion", function (_ref3, _ref4) {
      var label = _ref3.label;
      var _query = _ref4._query,
          isHighlighted = _ref4.isHighlighted;
      var className = config.css[isHighlighted ? 'activeItem' : 'item'];
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: className
      }, label);
    });

    _defineProperty(_assertThisInitialized(_this), "onSuggestionsFetchRequested", function (_ref5) {
      var _ref5$value = _ref5.value,
          value = _ref5$value === void 0 ? '' : _ref5$value;
      value = value.toLowerCase();

      var suggestions = _this.getChoices().filter(function (o) {
        return o.label.toLowerCase().includes(value);
      });

      _this.setState({
        suggestions: suggestions
      });
    });

    return _this;
  }

  _createClass(RJSFAutosuggest, [{
    key: "getChoices",
    value: function getChoices() {
      return this.props.options.enumOptions || this.props.options.choices;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$value = _this$props.value,
          value = _this$props$value === void 0 ? '' : _this$props$value,
          placeholder = _this$props.placeholder;
      var options = Object.assign({}, this.props.options);
      delete options.enumOptions;
      var inputProps = {
        onChange: this.onChange,
        placeholder: placeholder,
        value: value,
        className: 'form-control'
      };
      return /*#__PURE__*/_react["default"].createElement(_reactAutosuggest["default"], _extends({
        suggestions: this.state.suggestions,
        onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
        onSuggestionsClearRequested: this.onSuggestionsClearRequested,
        getSuggestionValue: this.getSuggestionValue,
        renderSuggestionsContainer: this.renderSuggestionsContainer,
        renderSuggestion: this.renderSuggestion,
        inputProps: inputProps
      }, options));
    }
  }]);

  return RJSFAutosuggest;
}(_react["default"].Component);

RJSFAutosuggest.config = config;
var _default = RJSFAutosuggest;
exports["default"] = _default;