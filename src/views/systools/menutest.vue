<template>
  <elComponent
    v-if="appParams.pageData"
    ref="menutest"
    :node="appParams.pageData"
    :route="$route.name"
  />
</template>

<script>
import _ from "lodash";
import elComponent from "@/components/elComponent/index";
import { resetObj, getVueComponent } from "@/utils/index";

let id = 0;
export default {
  provide() {
    return {
      superParams: this,
    };
  },
  inject: ["appParams"],
  components: {
    elComponent,
  },
  data() {
    const generateData = (_) => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `Option ${i}`,
          disabled: i % 4 === 0,
        });
      }
      return data;
    };

    const generateCustomizableData = (_) => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `Option ${i}`,
          disabled: i % 4 === 0,
        });
      }
      return data;
    };

    const generateFilterableData = (_) => {
      const data = [];
      const states = [
        "California",
        "Illinois",
        "Maryland",
        "Texas",
        "Florida",
        "Colorado",
        "Connecticut ",
      ];
      const initials = ["CA", "IL", "MD", "TX", "FL", "CO", "CT"];
      states.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          initial: initials[index],
        });
      });
      return data;
    };

    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please input the age"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Please input digits"));
        } else {
          if (value < 18) {
            callback(new Error("Age must be greater than 18"));
          } else {
            callback();
          }
        }
      }, 1000);
    };

    var validatePass = (rule, value, callback) => {
      if (this.elform.customValidationRuleForm.pass === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.elform.customValidationRuleForm.checkPass !== "") {
          var refComponent = getVueComponent(
            this,
            "$children",
            "$refs",
            "ruleForm"
          );
          refComponent.validateField("checkPass");
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.elform.customValidationRuleForm.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      elform: {
        model: {},
        rules: {},
        inlineFormModel: {
          user: "",
          region: "",
        },
        alignment: {
          formLabelAlign: {
            name: "",
            region: "",
            type: "",
          },
        },
        validationRules: {
          name: [
            {
              required: true,
              message: "Please input Activity name",
              trigger: "blur",
            },
            {
              min: 3,
              max: 5,
              message: "Length should be 3 to 5",
              trigger: "blur",
            },
          ],
          region: [
            {
              required: true,
              message: "Please select Activity zone",
              trigger: "change",
            },
          ],
          date1: [
            {
              type: "date",
              required: true,
              message: "Please pick a date",
              trigger: "change",
            },
          ],
          date2: [
            {
              type: "date",
              required: true,
              message: "Please pick a time",
              trigger: "change",
            },
          ],
          type: [
            {
              type: "array",
              required: true,
              message: "Please select at least one activity type",
              trigger: "change",
            },
          ],
          resource: [
            {
              required: true,
              message: "Please select activity resource",
              trigger: "change",
            },
          ],
          desc: [
            {
              required: true,
              message: "Please input activity form",
              trigger: "blur",
            },
          ],
        },
        validationRuleForm: {
          name: "",
          region: "",
          date1: "",
          date2: "",
          delivery: false,
          type: [],
          resource: "",
          desc: "",
        },
        customValidationRuleForm: {
          pass: "",
          checkPass: "",
          age: "",
        },
        customValidationRules: {
          pass: [{ validator: validatePass, trigger: "blur" }],
          checkPass: [{ validator: validatePass2, trigger: "blur" }],
          age: [{ validator: checkAge, trigger: "blur" }],
        },
        dynamicValidateForm: {
          domains: [
            {
              key: 1,
              value: "",
            },
          ],
          email: "",
        },
        dynamicValidateEmailRules: [
          {
            required: true,
            message: "Please input email address",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"],
          },
        ],
        numberValidateForm: {
          age: "",
        },
        numberValidateRules: [
          { required: true, message: "age is required" },
          { type: "number", message: "age must be a number" },
        ],
        sizeForm: {
          name: "",
          region: "",
          date1: "",
          date2: "",
          delivery: false,
          type: [],
          resource: "",
          desc: "",
        },
        sizeFormRegionList: [
          {
            label: "Zone one",
            value: "shanghai",
          },
          {
            label: "Zone two",
            value: "beijing",
          },
        ],
      },
      elformitem: {
        rules: {},
        prop: "",
      },
      elinput: {
        value: "title",
        autosize: {},
      },
      elcheckbox: {
        value: false,
      },
      elradiogroup: {
        value: "top",
      },
      elradio: {
        value: "",
      },
      elinputnumber: {
        value: 1,
      },
      elFormNested: {
        inputVal: "",
        selectVal: "",
      },
      elselect: {
        ElOptionListName: [{
          value: 'Option1',
          label: 'Option1'
        }, {
          value: 'Option2',
          label: 'Option2'
        }, {
          value: 'Option3',
          label: 'Option3'
        }, {
          value: 'Option4',
          label: 'Option4'
        }, {
          value: 'Option5',
          label: 'Option5'
        }],
        options2: [{
          value: 'Option1',
          label: 'Option1'
        }, {
          value: 'Option2',
          label: 'Option2',
          disabled: true
        }, {
          value: 'Option3',
          label: 'Option3'
        }, {
          value: 'Option4',
          label: 'Option4'
        }, {
          value: 'Option5',
          label: 'Option5'
        }],
        ElInlineFormListName: [
          {
            value: "shanghai",
            label: "Zone one",
          },
          {
            value: "beijing",
            label: "Zone two",
          },
        ],
        value1: "",
        value2: "",
        value3: "",
      },
      elcascader: {
        value1: [],
        props1: { expandTrigger: 'hover' },
        options1: [
          {
            value: "guide",
            label: "Guide",
            children: [
              {
                value: "disciplines",
                label: "Disciplines",
                children: [
                  {
                    value: "consistency",
                    label: "Consistency",
                  },
                  {
                    value: "feedback",
                    label: "Feedback",
                  },
                  {
                    value: "efficiency",
                    label: "Efficiency",
                  },
                  {
                    value: "controllability",
                    label: "Controllability",
                  },
                ],
              },
              {
                value: "navigation",
                label: "Navigation",
                children: [
                  {
                    value: "side nav",
                    label: "Side Navigation",
                  },
                  {
                    value: "top nav",
                    label: "Top Navigation",
                  },
                ],
              },
            ],
          },
          {
            value: "component",
            label: "Component",
            children: [
              {
                value: "basic",
                label: "Basic",
                children: [
                  {
                    value: "layout",
                    label: "Layout",
                  },
                  {
                    value: "color",
                    label: "Color",
                  },
                  {
                    value: "typography",
                    label: "Typography",
                  },
                  {
                    value: "icon",
                    label: "Icon",
                  },
                  {
                    value: "button",
                    label: "Button",
                  },
                ],
              },
              {
                value: "form",
                label: "Form",
                children: [
                  {
                    value: "radio",
                    label: "Radio",
                  },
                  {
                    value: "checkbox",
                    label: "Checkbox",
                  },
                  {
                    value: "input",
                    label: "Input",
                  },
                  {
                    value: "input-number",
                    label: "InputNumber",
                  },
                  {
                    value: "select",
                    label: "Select",
                  },
                  {
                    value: "cascader",
                    label: "Cascader",
                  },
                  {
                    value: "switch",
                    label: "Switch",
                  },
                  {
                    value: "slider",
                    label: "Slider",
                  },
                  {
                    value: "time-picker",
                    label: "TimePicker",
                  },
                  {
                    value: "date-picker",
                    label: "DatePicker",
                  },
                  {
                    value: "datetime-picker",
                    label: "DateTimePicker",
                  },
                  {
                    value: "upload",
                    label: "Upload",
                  },
                  {
                    value: "rate",
                    label: "Rate",
                  },
                  {
                    value: "form",
                    label: "Form",
                  },
                ],
              },
              {
                value: "data",
                label: "Data",
                children: [
                  {
                    value: "table",
                    label: "Table",
                  },
                  {
                    value: "tag",
                    label: "Tag",
                  },
                  {
                    value: "progress",
                    label: "Progress",
                  },
                  {
                    value: "tree",
                    label: "Tree",
                  },
                  {
                    value: "pagination",
                    label: "Pagination",
                  },
                  {
                    value: "badge",
                    label: "Badge",
                  },
                ],
              },
              {
                value: "notice",
                label: "Notice",
                children: [
                  {
                    value: "alert",
                    label: "Alert",
                  },
                  {
                    value: "loading",
                    label: "Loading",
                  },
                  {
                    value: "message",
                    label: "Message",
                  },
                  {
                    value: "message-box",
                    label: "MessageBox",
                  },
                  {
                    value: "notification",
                    label: "Notification",
                  },
                ],
              },
              {
                value: "navigation",
                label: "Navigation",
                children: [
                  {
                    value: "menu",
                    label: "NavMenu",
                  },
                  {
                    value: "tabs",
                    label: "Tabs",
                  },
                  {
                    value: "breadcrumb",
                    label: "Breadcrumb",
                  },
                  {
                    value: "dropdown",
                    label: "Dropdown",
                  },
                  {
                    value: "steps",
                    label: "Steps",
                  },
                ],
              },
              {
                value: "others",
                label: "Others",
                children: [
                  {
                    value: "dialog",
                    label: "Dialog",
                  },
                  {
                    value: "tooltip",
                    label: "Tooltip",
                  },
                  {
                    value: "popover",
                    label: "Popover",
                  },
                  {
                    value: "card",
                    label: "Card",
                  },
                  {
                    value: "carousel",
                    label: "Carousel",
                  },
                  {
                    value: "collapse",
                    label: "Collapse",
                  },
                ],
              },
            ],
          },
          {
            value: "resource",
            label: "Resource",
            children: [
              {
                value: "axure",
                label: "Axure Components",
              },
              {
                value: "sketch",
                label: "Sketch Templates",
              },
              {
                value: "docs",
                label: "Design Documentation",
              },
            ],
          },
        ],
        options2: [{
          value: 'guide',
          label: 'Guide',
          disabled: true,
          children: [{
            value: 'disciplines',
            label: 'Disciplines',
            children: [{
              value: 'consistency',
              label: 'Consistency'
            }, {
              value: 'feedback',
              label: 'Feedback'
            }, {
              value: 'efficiency',
              label: 'Efficiency'
            }, {
              value: 'controllability',
              label: 'Controllability'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'side nav',
              label: 'Side Navigation'
            }, {
              value: 'top nav',
              label: 'Top Navigation'
            }]
          }]
        }, {
          value: 'component',
          label: 'Component',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout'
            }, {
              value: 'color',
              label: 'Color'
            }, {
              value: 'typography',
              label: 'Typography'
            }, {
              value: 'icon',
              label: 'Icon'
            }, {
              value: 'button',
              label: 'Button'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio'
            }, {
              value: 'checkbox',
              label: 'Checkbox'
            }, {
              value: 'input',
              label: 'Input'
            }, {
              value: 'input-number',
              label: 'InputNumber'
            }, {
              value: 'select',
              label: 'Select'
            }, {
              value: 'cascader',
              label: 'Cascader'
            }, {
              value: 'switch',
              label: 'Switch'
            }, {
              value: 'slider',
              label: 'Slider'
            }, {
              value: 'time-picker',
              label: 'TimePicker'
            }, {
              value: 'date-picker',
              label: 'DatePicker'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker'
            }, {
              value: 'upload',
              label: 'Upload'
            }, {
              value: 'rate',
              label: 'Rate'
            }, {
              value: 'form',
              label: 'Form'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table'
            }, {
              value: 'tag',
              label: 'Tag'
            }, {
              value: 'progress',
              label: 'Progress'
            }, {
              value: 'tree',
              label: 'Tree'
            }, {
              value: 'pagination',
              label: 'Pagination'
            }, {
              value: 'badge',
              label: 'Badge'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert'
            }, {
              value: 'loading',
              label: 'Loading'
            }, {
              value: 'message',
              label: 'Message'
            }, {
              value: 'message-box',
              label: 'MessageBox'
            }, {
              value: 'notification',
              label: 'Notification'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu'
            }, {
              value: 'tabs',
              label: 'Tabs'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb'
            }, {
              value: 'dropdown',
              label: 'Dropdown'
            }, {
              value: 'steps',
              label: 'Steps'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog'
            }, {
              value: 'tooltip',
              label: 'Tooltip'
            }, {
              value: 'popover',
              label: 'Popover'
            }, {
              value: 'card',
              label: 'Card'
            }, {
              value: 'carousel',
              label: 'Carousel'
            }, {
              value: 'collapse',
              label: 'Collapse'
            }]
          }]
        }, {
          value: 'resource',
          label: 'Resource',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'docs',
            label: 'Design Documentation'
          }]
        }],
        options3: [{
          value: 'guide',
          label: 'Guide',
          children: [{
            value: 'disciplines',
            label: 'Disciplines',
            children: [{
              value: 'consistency',
              label: 'Consistency'
            }, {
              value: 'feedback',
              label: 'Feedback'
            }, {
              value: 'efficiency',
              label: 'Efficiency'
            }, {
              value: 'controllability',
              label: 'Controllability'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'side nav',
              label: 'Side Navigation'
            }, {
              value: 'top nav',
              label: 'Top Navigation'
            }]
          }]
        }, {
          value: 'component',
          label: 'Component',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout'
            }, {
              value: 'color',
              label: 'Color'
            }, {
              value: 'typography',
              label: 'Typography'
            }, {
              value: 'icon',
              label: 'Icon'
            }, {
              value: 'button',
              label: 'Button'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio'
            }, {
              value: 'checkbox',
              label: 'Checkbox'
            }, {
              value: 'input',
              label: 'Input'
            }, {
              value: 'input-number',
              label: 'InputNumber'
            }, {
              value: 'select',
              label: 'Select'
            }, {
              value: 'cascader',
              label: 'Cascader'
            }, {
              value: 'switch',
              label: 'Switch'
            }, {
              value: 'slider',
              label: 'Slider'
            }, {
              value: 'time-picker',
              label: 'TimePicker'
            }, {
              value: 'date-picker',
              label: 'DatePicker'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker'
            }, {
              value: 'upload',
              label: 'Upload'
            }, {
              value: 'rate',
              label: 'Rate'
            }, {
              value: 'form',
              label: 'Form'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table'
            }, {
              value: 'tag',
              label: 'Tag'
            }, {
              value: 'progress',
              label: 'Progress'
            }, {
              value: 'tree',
              label: 'Tree'
            }, {
              value: 'pagination',
              label: 'Pagination'
            }, {
              value: 'badge',
              label: 'Badge'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert'
            }, {
              value: 'loading',
              label: 'Loading'
            }, {
              value: 'message',
              label: 'Message'
            }, {
              value: 'message-box',
              label: 'MessageBox'
            }, {
              value: 'notification',
              label: 'Notification'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu'
            }, {
              value: 'tabs',
              label: 'Tabs'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb'
            }, {
              value: 'dropdown',
              label: 'Dropdown'
            }, {
              value: 'steps',
              label: 'Steps'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog'
            }, {
              value: 'tooltip',
              label: 'Tooltip'
            }, {
              value: 'popover',
              label: 'Popover'
            }, {
              value: 'card',
              label: 'Card'
            }, {
              value: 'carousel',
              label: 'Carousel'
            }, {
              value: 'collapse',
              label: 'Collapse'
            }]
          }]
        }, {
          value: 'resource',
          label: 'Resource',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'docs',
            label: 'Design Documentation'
          }]
        }],
        props2: { multiple: true },
        options5: [{
          value: 1,
          label: 'Asia',
          children: [{
            value: 2,
            label: 'China',
            children: [
              { value: 3, label: 'Beijing' },
              { value: 4, label: 'Shanghai' },
              { value: 5, label: 'Hangzhou' }
            ]
          }, {
            value: 6,
            label: 'Japan',
            children: [
              { value: 7, label: 'Tokyo' },
              { value: 8, label: 'Osaka' },
              { value: 9, label: 'Kyoto' }
            ]
          }, {
            value: 10,
            label: 'Korea',
            children: [
              { value: 11, label: 'Seoul' },
              { value: 12, label: 'Busan' },
              { value: 13, label: 'Taegu' }
            ]
          }]
        }, {
          value: 14,
          label: 'Europe',
          children: [{
            value: 15,
            label: 'France',
            children: [
              { value: 16, label: 'Paris' },
              { value: 17, label: 'Marseille' },
              { value: 18, label: 'Lyon' }
            ]
          }, {
            value: 19,
            label: 'UK',
            children: [
              { value: 20, label: 'London' },
              { value: 21, label: 'Birmingham' },
              { value: 22, label: 'Manchester' }
            ]
          }]
        }, {
          value: 23,
          label: 'North America',
          children: [{
            value: 24,
            label: 'US',
            children: [
              { value: 25, label: 'New York' },
              { value: 26, label: 'Los Angeles' },
              { value: 27, label: 'Washington' }
            ]
          }, {
            value: 28,
            label: 'Canada',
            children: [
              { value: 29, label: 'Toronto' },
              { value: 30, label: 'Montreal' },
              { value: 31, label: 'Ottawa' }
            ]
          }]
        }],
        options6: [{
          value: 'guide',
          label: 'Guide',
          children: [{
            value: 'disciplines',
            label: 'Disciplines',
            children: [{
              value: 'consistency',
              label: 'Consistency'
            }, {
              value: 'feedback',
              label: 'Feedback'
            }, {
              value: 'efficiency',
              label: 'Efficiency'
            }, {
              value: 'controllability',
              label: 'Controllability'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'side nav',
              label: 'Side Navigation'
            }, {
              value: 'top nav',
              label: 'Top Navigation'
            }]
          }]
        }, {
          value: 'component',
          label: 'Component',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout'
            }, {
              value: 'color',
              label: 'Color'
            }, {
              value: 'typography',
              label: 'Typography'
            }, {
              value: 'icon',
              label: 'Icon'
            }, {
              value: 'button',
              label: 'Button'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio'
            }, {
              value: 'checkbox',
              label: 'Checkbox'
            }, {
              value: 'input',
              label: 'Input'
            }, {
              value: 'input-number',
              label: 'InputNumber'
            }, {
              value: 'select',
              label: 'Select'
            }, {
              value: 'cascader',
              label: 'Cascader'
            }, {
              value: 'switch',
              label: 'Switch'
            }, {
              value: 'slider',
              label: 'Slider'
            }, {
              value: 'time-picker',
              label: 'TimePicker'
            }, {
              value: 'date-picker',
              label: 'DatePicker'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker'
            }, {
              value: 'upload',
              label: 'Upload'
            }, {
              value: 'rate',
              label: 'Rate'
            }, {
              value: 'form',
              label: 'Form'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table'
            }, {
              value: 'tag',
              label: 'Tag'
            }, {
              value: 'progress',
              label: 'Progress'
            }, {
              value: 'tree',
              label: 'Tree'
            }, {
              value: 'pagination',
              label: 'Pagination'
            }, {
              value: 'badge',
              label: 'Badge'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert'
            }, {
              value: 'loading',
              label: 'Loading'
            }, {
              value: 'message',
              label: 'Message'
            }, {
              value: 'message-box',
              label: 'MessageBox'
            }, {
              value: 'notification',
              label: 'Notification'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu'
            }, {
              value: 'tabs',
              label: 'Tabs'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb'
            }, {
              value: 'dropdown',
              label: 'Dropdown'
            }, {
              value: 'steps',
              label: 'Steps'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog'
            }, {
              value: 'tooltip',
              label: 'Tooltip'
            }, {
              value: 'popover',
              label: 'Popover'
            }, {
              value: 'card',
              label: 'Card'
            }, {
              value: 'carousel',
              label: 'Carousel'
            }, {
              value: 'collapse',
              label: 'Collapse'
            }]
          }]
        }, {
          value: 'resource',
          label: 'Resource',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'docs',
            label: 'Design Documentation'
          }]
        }],
        props3: { checkStrictly: true },
        props5: { multiple: true, checkStrictly: true },
        props6: {
          lazy: true,
          lazyLoad (node, resolve) {
            const { level } = node;
            setTimeout(() => {
              const nodes = Array.from({ length: level + 1 })
                .map(item => ({
                  value: ++id,
                  label: `Option - ${id}`,
                  leaf: level >= 2
                }));
              // Invoke `resolve` callback to return the child nodes data and indicate the loading is finished.
              resolve(nodes);
            }, 1000);
          }
        }
      },
      elswitch: {
        value1: true,
        value2: true,
        value3: true,
        value4: true,
        value5: true,
        value6: false,
        value8: true,
        rules: {},
      },
      elslider: {
        value1: 0,
        value2: 50,
        value3: 36,
        value4: 48,
        value5: 42,
        value6: 0,
        value7: 0,
        value8: 0,
        value9: [2, 8],
        value10: 0,
        value11: [30, 60],
        marks: {
          0: "0°C",
          8: "8°C",
          37: "37°C",
          50: {
            style: {
              color: "#1989FA",
            },
            label: this.$createElement("strong", "50%"),
          },
        },
      },
      eltimeselect: {
        value1: "",
        fixedTimeRangeStartTime: "",
        fixedTimeRangeEndTime: "",
        fixedTimePickerOptions: {
          start: "08:30",
          step: "00:15",
          end: "18:30",
        },
        fixedTimeRangeStartTimePickerOptions: {
          start: "08:30",
          step: "00:15",
          end: "18:30",
        },
      },
      eltimepicker: {
        value1: "",
        value2: new Date(2016, 9, 10, 18, 40),
        value3: new Date(2016, 9, 10, 18, 40),
        value5: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        value6: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],

        fixedTimePickerOptions: {
          start: "08:30",
          step: "00:15",
          end: "18:30",
        },
        arbitraryTimePickerOptions: {
          selectableRange: "18:30:00 - 20:30:00",
        },
      },
      eldatepicker: {
        value1: "",
        value2: "",
        value3: "",
        value5: "",
        value6: "",
        value7: "",
        value8: "",
        value9: "",
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [
            {
              text: "Today",
              onClick(picker) {
                picker.$emit("pick", new Date());
              },
            },
            {
              text: "Yesterday",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit("pick", date);
              },
            },
            {
              text: "A week ago",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", date);
              },
            },
          ],
        },
        dateRangeValue1: "",
        dateRangeValue2: "",
        dateRangepickerOptions: {
          shortcuts: [
            {
              text: "Last week",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "Last month",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "Last 3 months",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              },
            },
          ],
        },
        monthRangeValue1: "",
        monthRangeValue2: "",
        monthRangePickerOptions: {
          shortcuts: [
            {
              text: "This month",
              onClick(picker) {
                picker.$emit("pick", [new Date(), new Date()]);
              },
            },
            {
              text: "This year",
              onClick(picker) {
                const end = new Date();
                const start = new Date(new Date().getFullYear(), 0);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "Last 6 months",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setMonth(start.getMonth() - 6);
                picker.$emit("pick", [start, end]);
              },
            },
          ],
        },
        defaultValue1: "",
        defaultValue2: "",
      },
      eldatetimePicker: {
        pickerOptions: {
          shortcuts: [
            {
              text: "Today",
              onClick(picker) {
                picker.$emit("pick", new Date());
              },
            },
            {
              text: "Yesterday",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit("pick", date);
              },
            },
            {
              text: "A week ago",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", date);
              },
            },
          ],
        },
        pickerOption2: {
          shortcuts: [
            {
              text: "Last week",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "Last month",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "Last 3 months",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              },
            },
          ],
        },
        value1: "",
        value2: "",
        value3: "",
        value5: [
          new Date(2000, 10, 10, 10, 10),
          new Date(2000, 10, 11, 10, 10),
        ],
        value6: "",
      },
      elupload: {
        fileList: [
          {
            name: "food.jpeg",
            url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
          },
          {
            name: "food2.jpeg",
            url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
          },
        ],
        dragToUploadFileList: [],
        headers: {},
        limit: 3,
        data: {},
        imageUrl: "",
        photoWallImageUrl: "",
        customFileThumbnailImageUrl: "",
        customFileThumbnailDisabled: false,
      },
      eldescriptionsitem: {
        contentStyle: { "text-align": "right" },
      },
      imageUrl: "",
      customcontent: {
        attributeName: "",
        tipAttribute: {
          tag: "div",
          class: ["el-upload__tip"],
          props: {
            slot: "tip",
          },
          text: "jpg/png files with a size less than 500kb",
        },
        imageAttribute: {
          condition: "imageUrl",
          conditionVal: true,
          tag: "img",
          class: ["avatar"],
          props: {
            src: "imageUrl",
          },
        },
        iconAttribute: {
          conditionVal: false,
          condition: "imageUrl",
          tag: "i",
          class: ["el-icon-plus", "avatar-uploader-icon"],
        },
        templateAttribute: {
          slot: "template",
        },
        skeletonItemDiv: {
          style: {
            padding: "14px",
          },
        },
        skeletonItemRight: {
          display: "flex",
          alignItems: "center",
          justifyItems: "space-between",
          marginTop: "16px",
          height: "16px",
        },
        elcartTitle: {
          tag: "span",
          text: "Delicious hamberger",
        },
        elcartTime: {
          tag: "span",
          text: "2021-06-01",
        },
        descriptionsItemTitle1: {
          tag: "span",
          text: "kooriookami",
        },
        descriptionsItemTitle2: {
          tag: "span",
          text: "18100000000",
        },
        descriptionsItemTitle3: {
          tag: "span",
          text: "Suzhou",
        },
        descriptionsItemTitle5: {
          tag: "span",
          text: "No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province",
        },
        descriptionsItemElTagTitle: {
          tag: "span",
          text: "School",
        },
        transferAttribute: {
          scopedSlots: true,
        },
        tabPaneText: {
          text: "Route",
        },
        elDropdownLink: {
          tag: "span",
          text: "Dropdown List",
        },
        eldialogContent: {
          tag: "span",
          text: "This is a message",
        },
        elCardTitle: {
          tag: "span",
          text: "Card name",
        },
        elCardContent1: {
          tag: "div",
          text: "List item 1",
          style: {
            "margin-bottom": "18px",
          },
        },
        elCardContent2: {
          tag: "div",
          text: "List item 2",
          style: {
            "margin-bottom": "18px",
          },
        },
        elCardContent3: {
          tag: "div",
          text: "List item 3",
          style: {
            "margin-bottom": "18px",
          },
        },
        elCardContent4: {
          tag: "div",
          text: "List item 4",
          style: {
            "margin-bottom": "18px",
          },
        },
        elCollapseItemContent1: {
          tag: "div",
          text: "Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;",
        },
        elCollapseItemContent2: {
          tag: "div",
          text: "Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.",
        },
        elCollapseItemContent3: {
          tag: "div",
          text: "Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;",
        },
        elCollapseItemContent4: {
          tag: "div",
          text: "Visual feedback: reflect current state by updating or rearranging elements of the page.",
        },
        elCollapseItemContent5: {
          tag: "div",
          text: "Simplify the process: keep operating process simple and intuitive;",
        },
        elCollapseItemContent6: {
          tag: "div",
          text: "Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;",
        },
        elCollapseItemContent7: {
          tag: "div",
          text: "Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.",
        },
        elCollapseItemContent8: {
          tag: "div",
          text: "Decision making: giving advices about operations is acceptable, but do not make decisions for the users;",
        },
        elCollapseItemContent9: {
          tag: "div",
          text: "Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or terminating current operation.",
        },
        elDividerContent1: {
          tag: "span",
          text: "What you are you do not see, what you see is your shadow. ",
        },
        elDividerContent2: {
          tag: "span",
          text: "I cannot choose the best. The best chooses me.",
        },
        elDividerContent3: {
          tag: "span",
          text: "My wishes are fools, they shout across thy song, my Master. Let me but listen.",
        },
        elbacktopText: {
          tag: "span",
          text: "Scroll down to see the bottom-right button.",
        },
        elbacktopcustomizationsText: {
          tag: "div",
          style: {
            height: "100%",
            width: "100%",
            "background-color": "#f2f5f6",
            "box-shadow": "0 0 6px rgba(0,0,0, .12)",
            "text-align": "center",
            "line-height": "40px",
            color: "#1989fa",
          },
          text: "UP",
        },
        elbacktopcustomizations: {
          tag: "span",
          text: "Customizations Scroll down to see the bottom-right button.",
        },
        vInfiniteScrollTemplate_basicUsage: {
          tag: "ul",
          class: "infinite-list",
          style: { overflow: "auto" },
          directives: [
            {
              name: "infinite-scroll",
              value: this.loadBasicUsage,
            },
          ],
        },
        vInfiniteScrollTemplate_disableLoading: {
          tag: "ul",
          class: "infinite-list",
          style: { overflow: "auto" },
          props: {
            "infinite-scroll-disabled": this.disabledMethod,
          },
          directives: [
            {
              name: "infinite-scroll",
              value: this.loadDisable,
            },
          ],
        },
        infiniteScrollLoadingTag: {
          tag: "p",
          style: {
            "text-align": "center",
            visibility: "hidden",
          },
          directives: [
            //自定义指令无效
            {
              name: "show",
              value: false,
            },
          ],
          refName: "scrollLoadingTag",
          text: "Loading...",
        },
        infiniteScrollDisableTag: {
          tag: "p",
          style: {
            "text-align": "center",
            visibility: "hidden",
          },
          directives: [
            //自定义指令无效
            {
              name: "show",
              value: false,
            },
          ],
          refName: "scrollDisableTag",
          text: "No more",
        },
        infiniteListItem_basicUsage: {
          tag: "li",
          class: "infinite-list-item",
          list: [
            { id: 1, label: 1 },
            { id: 2, label: 2 },
            { id: 3, label: 3 },
            { id: 4, label: 4 },
            { id: 5, label: 5 },
            { id: 6, label: 6 },
            { id: 7, label: 7 },
          ],
        },
        infiniteListItem_disableLoading: {
          tag: "li",
          class: "infinite-list-item",
          list: [
            { id: 1, label: 1 },
            { id: 2, label: 2 },
            { id: 3, label: 3 },
            { id: 4, label: 4 },
            { id: 5, label: 5 },
            { id: 6, label: 6 },
            { id: 7, label: 7 },
          ],
        },
        elInnerDrawerText: {
          tag: "p",
          text: "_(:зゝ∠)_",
        },
        elDrawerCustomTag: {
          tag: "div",
        },
        imageFailedSlotAttribute: {
          tag: "div",
          slot: "error",
          class: "image-slot",
        },
        imageFailedIconAttribute: {
          tag: "i",
          class: "el-icon-picture-outline",
        },
        elImageTypeName1: {
          tag: "p",
          text: "Basic Usage",
        },
        elImageTypeName2: {
          tag: "p",
          text: "Placeholder",
        },
        elImageTypeName3: {
          tag: "p",
          text: "Load Failed",
        },
        elImageTraverseAttribute: {
          type: "elImageTraverse",
          style: {
            padding: "30px 0",
            "text-align": "center",
            "border-right": "1px solid #eff2f6",
            display: "inline-block",
            width: "20%",
            "box-sizing": "border-box",
            "vertical-align": "top",
            "margin-right": "20px",
          },
          fits: ["fill", "contain", "cover", "none", "scale-down"],
          url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        },
        elPlaceholderImageAttribute: {
          tag: "div",
          class: "demo-image__placeholder",
          childrenNode: [
            {
              tag: "div",
              style: {
                padding: "30px 0",
                "text-align": "center",
                "border-right": "1px solid #eff2f6",
                display: "inline-block",
                width: "20%",
                "box-sizing": "border-box",
                "vertical-align": "top",
                "margin-right": "20px",
              },
              childrenNode: [
                {
                  tag: "span",
                  style: {
                    display: "block",
                    color: "#8492a6",
                    "font-size": "14px",
                    "margin-bottom": "20px",
                  },
                  text: "Default",
                },
                {
                  tag: "el-image",
                  style: {
                    width: "100px",
                    height: "100px",
                  },
                  props: {
                    src: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
                  },
                },
              ],
            },
            {
              tag: "div",
              style: {
                padding: "30px 0",
                "text-align": "center",
                "border-right": "1px solid #eff2f6",
                display: "inline-block",
                width: "20%",
                "box-sizing": "border-box",
                "vertical-align": "top",
                "margin-right": "20px",
              },
              childrenNode: [
                {
                  tag: "span",
                  style: {
                    display: "block",
                    color: "#8492a6",
                    "font-size": "14px",
                    "margin-bottom": "20px",
                  },
                  text: "Custom",
                },
                {
                  tag: "el-image",
                  style: {
                    width: "100px",
                    height: "100px",
                  },
                  props: {
                    src: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
                  },
                  childrenNode: [
                    {
                      tag: "div",
                      class: "image-slot",
                      props: {
                        slot: "placeholder",
                      },
                      slot: "placeholder",
                      childrenNode: [
                        {
                          text: "Loading",
                          childrenNode: [
                            {
                              tag: "span",
                              class: "dot",
                              text: "...",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        elLoadFailedImageAttribute: {
          tag: "div",
          class: "demo-image__placeholder",
          childrenNode: [
            {
              tag: "div",
              style: {
                padding: "30px 0",
                "text-align": "center",
                "border-right": "1px solid #eff2f6",
                display: "inline-block",
                width: "20%",
                "box-sizing": "border-box",
                "vertical-align": "top",
                "margin-right": "20px",
              },
              childrenNode: [
                {
                  tag: "span",
                  style: {
                    display: "block",
                    color: "#8492a6",
                    "font-size": "14px",
                    "margin-bottom": "20px",
                  },
                  text: "Default",
                },
                {
                  tag: "el-image",
                  style: {
                    width: "100px",
                    height: "100px",
                  },
                },
              ],
            },
            {
              tag: "div",
              style: {
                padding: "30px 0",
                "text-align": "center",
                "border-right": "1px solid #eff2f6",
                display: "inline-block",
                width: "20%",
                "box-sizing": "border-box",
                "vertical-align": "top",
                "margin-right": "20px",
              },
              childrenNode: [
                {
                  tag: "span",
                  style: {
                    display: "block",
                    color: "#8492a6",
                    "font-size": "14px",
                    "margin-bottom": "20px",
                  },
                  text: "Custom",
                },
                {
                  tag: "el-image",
                  style: {
                    width: "100px",
                    height: "100px",
                  },
                  childrenNode: [
                    {
                      tag: "div",
                      slot: "error",
                      style: {
                        display: "flex",
                        "justify-content": "center",
                        "align-items": "center",
                        "font-size": "30px",
                        width: "100%",
                        height: "100%",
                        background: "#f5f7fa",
                        color: "#909399",
                      },
                      childrenNode: [
                        {
                          tag: "i",
                          class: "el-icon-picture-outline",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        elBacktopType1: {
          tag: "p",
          text: "Basic usage",
        },
        elBacktopType2: {
          tag: "p",
          text: "Customizations",
        },
        elInfiniteScrollType1: {
          tag: "p",
          text: "Basic usage",
        },
        elInfiniteScrollType2: {
          tag: "p",
          text: "Disable Loading",
        },
        elDrawerlType1: {
          tag: "p",
          text: "Basic Usage",
        },
        elDrawerlType2: {
          tag: "p",
          text: "Customization Content",
        },
        elDrawerlType3: {
          tag: "p",
          text: "Nested Drawer",
        },
        elCalendarType1: {
          tag: "p",
          text: "Basic",
        },
        elCalendarType2: {
          tag: "p",
          text: "Custom Content",
        },
        elCalendarType3: {
          tag: "p",
          text: "Range",
        },
        elCalendarCustomContent: {
          tag: "p",
          type: "customCalendar",
        },
        elDividerType1: {
          tag: "p",
          style: {
            margin: "20px 0",
          },
          text: "Basic usage",
        },
        elDividerType2: {
          tag: "p",
          style: {
            margin: "20px 0",
          },
          text: "Custom content",
        },
        elDividerType3: {
          tag: "p",
          style: {
            margin: "20px 0",
          },
          text: "Vertical divider",
        },
        elDividerVerticalDividertitle1: {
          tag: "span",
          text: "Rain",
        },
        elDividerVerticalDividertitle2: {
          tag: "span",
          text: "Home",
        },
        elDividerVerticalDividertitle3: {
          tag: "span",
          text: "Grass",
        },
        elTimelineType1: {
          tag: "span",
          style: {
            display: "flex",
            "margin-bottom": "20px",
          },
          text: "Basic usage",
        },
        elTimelineType2: {
          tag: "span",
          text: "Custom node",
        },
        elTimelineType3: {
          tag: "span",
          text: "Custom timestamp",
        },
        elTimelineOrder: {
          tag: "div",
          style: {
            float: "left",
            margin: "1px 0 20px 0",
          },
          text: "Order",
        },
        elTimelineGroup: {
          type: "elRadioGroup",
          refName: "elRadioGroup",
          value: true,
          style: {
            float: "left",
            margin: "0 0 20px 20px",
          },
          elRadiolist: [
            {
              value: true,
              label: "descending",
            },
            {
              value: false,
              label: "ascending",
            },
          ],
        },
        elTimelineCustomNode: {
          type: "timelineCustom",
          timelineCustomList: [
            {
              content: "Custom icon",
              timestamp: "2018-04-12 20:46",
              size: "large",
              type: "primary",
              icon: "el-icon-more",
            },
            {
              content: "Custom color",
              timestamp: "2018-04-03 20:46",
              color: "#0bbd87",
            },
            {
              content: "Custom size",
              timestamp: "2018-04-03 20:46",
              size: "large",
            },
            {
              content: "Default node",
              timestamp: "2018-04-03 20:46",
            },
          ],
        },
        elTimeLineItemCardContent1: {
          tag: "div",
          childrenNode: [
            {
              tag: "h4",
              text: "Update Github template",
            },
            {
              tag: "p",
              text: "Tom committed 2018/4/12 20:46",
            },
          ],
        },
        elTimeLineItemCardContent2: {
          tag: "div",
          childrenNode: [
            {
              tag: "h4",
              text: "Update Github template",
            },
            {
              tag: "p",
              text: "Tom committed 2018/4/3 20:46",
            },
          ],
        },
        elTimeLineItemCardContent3: {
          tag: "div",
          childrenNode: [
            {
              tag: "h4",
              text: "Update Github template",
            },
            {
              tag: "p",
              text: "Tom committed 2018/4/2 20:46",
            },
          ],
        },
        elCollapseType1: {
          tag: "span",
          style: {
            margin: "20px 0",
          },
          text: "Basic usage",
        },
        elCollapseType2: {
          tag: "span",
          style: {
            margin: "20px 0",
          },
          text: "Accordion",
        },
        elCollapseType3: {
          tag: "span",
          text: "Custom title",
        },
        elCollapseCustomTitle: {
          type: "customCollapseItemTitle",
          slot: "title",
          text: "Consistency",
          tag: "i",
          class: "header-icon el-icon-info",
          style: {
            "margin-left": "5px",
          },
          childrenNode: [
            {
              tag: "div",
              text: "Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;",
            },
            {
              tag: "div",
              text: "Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.",
            },
          ],
        },
        elCarouselType1: {
          tag: "span",
          text: "Basic usage",
        },
        elCarouselType2: {
          tag: "span",
          text: "Indicators",
        },
        elCarouselType3: {
          tag: "span",
          text: "Arrows",
        },
        elCarouselType4: {
          tag: "span",
          text: "Card mode",
        },
        elCarouselType5: {
          tag: "span",
          text: "vertical",
        },
        elCardType1: {
          tag: "span",
          text: "Basic usage",
        },
        elCardType2: {
          tag: "span",
          text: "Simple card",
        },
        elCardType3: {
          tag: "span",
          text: "With images",
        },
        elCardType4: {
          tag: "span",
          text: "Shadow",
        },
        elCardShadowAlway: {
          tag: "span",
          text: "Always",
        },
        elCardShadowHover: {
          tag: "span",
          text: "Hover",
        },
        elCardShadowNever: {
          tag: "span",
          text: "Never",
        },
        elPopconfirmType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elPopconfirmType2: {
          tag: "span",
          text: "Customise",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elPopoverType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elPopoverType2: {
          tag: "span",
          text: "Nested information",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elPopoverType3: {
          tag: "span",
          text: "Nested operation",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elPopoverNestedOperation: {
          tag: "p",
          text: "Are you sure to delete this?",
        },
        elTooltipType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTooltipType2: {
          tag: "span",
          text: "Theme",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTooltipType3: {
          tag: "span",
          text: "More Content",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTooltipType4: {
          tag: "span",
          text: "Advanced usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTooltipMoreContent: {
          type: "tooltipMoreContent",
          slot: "content",
          text1: "Advanced usage",
          text2: "second line",
        },
        elTooltipAdvancedUsage: {
          type: "tooltipAdvancedUsage",
          text: "click to close tooltip function",
        },
        elDialogType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elDialogType2: {
          tag: "span",
          text: "Customizations",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elDialogType3: {
          tag: "span",
          text: "Nested Dialog",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elDialogType4: {
          tag: "span",
          text: "Centered content",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elCenteredContent: {
          tag: "span",
          text: "It should be noted that the content will not be aligned in center by default",
        },
        elStepsType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elStepsType2: {
          tag: "span",
          text: "Step bar that contains status",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elStepsType3: {
          tag: "span",
          text: "Center",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elStepsType4: {
          tag: "span",
          text: "Step bar with description",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elStepsType5: {
          tag: "span",
          text: "Step bar with icon",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elStepsType6: {
          tag: "span",
          text: "Vertical step bar",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elStepsType7: {
          tag: "span",
          text: "Simple step bar",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elDropdownType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elDropdownType2: {
          tag: "span",
          text: "Triggering element",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elDropdownType3: {
          tag: "span",
          text: "How to trigger",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elDropdownType4: {
          tag: "span",
          text: "Menu hiding behavior",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elDropdownType5: {
          tag: "span",
          text: "Command event",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elDropdownType6: {
          tag: "span",
          text: "Sizes",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elDropdownBasicUsageBtn: {
          type: "basicUsageBtn",
          text: "Dropdown List",
        },
        elDropdownTriggeringElementBtn: {
          type: "dropdownListBtn",
          text: "Dropdown List",
        },
        elDropdownTriggeringElementBtn2: {
          tag: "span",
          text: "Dropdown List",
        },
        elHoverTriggerTitle: {
          tag: "span",
          text: "hover to trigger",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elClickTriggerTitle: {
          tag: "span",
          text: "click to trigger",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elDropdownSizesType1: {
          tag: "span",
          text: "Default",
        },
        elDropdownSizesType2: {
          tag: "span",
          text: "Medium",
        },
        elDropdownSizesType3: {
          tag: "span",
          text: "Small",
        },
        elDropdownSizesType4: {
          tag: "span",
          text: "Mini",
        },
        elPageHeaderType: {
          tag: "span",
          text: "Basic",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elBreadcrumbType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elBreadcrumbType2: {
          tag: "span",
          text: "Icon separator",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTabsType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTabsType2: {
          tag: "span",
          text: "Card Style",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTabsType3: {
          tag: "span",
          text: "Border card",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTabsType4: {
          tag: "span",
          text: "Tab position",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTabsType5: {
          tag: "span",
          text: "Custom Tab",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTabsType6: {
          tag: "span",
          text: "Add & close tab",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTabsType7: {
          tag: "span",
          text: "Customized trigger button of new tab",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTabsCustomTab: {
          type: "customTab",
          text: "Route",
        },
        elTabList: {
          type: "tabList",
          tabList: [
            {
              title: "Tab 1",
              name: "1",
              content: "Tab 1 content",
            },
            {
              title: "Tab 2",
              name: "2",
              content: "Tab 2 content",
            },
          ],
        },
        elTabsCustomizedTrigger: {
          type: "customizedTrigger",
        },
        elNavMenuType1: {
          tag: "span",
          text: "Top bar",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elNavMenuType2: {
          tag: "span",
          text: "Side bar",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elNavMenuType3: {
          tag: "span",
          text: "Collapse",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elNavMenuCollapseRadioBtnTitle: {
          tag: "span",
          text: "expand",
        },
        elNavMenuCollapseRadioBtnTitle2: {
          tag: "span",
          text: "collapse",
        },
        elNavMenuSidebarLoaction: {
          type: "submenuLoaction",
          text: "Navigator One",
        },
        elMenuItem2: {
          type: "elMenuItemType",
          index: "2",
          disabled: false,
          icon: "el-icon-menu",
          text: "Navigator Two",
        },
        elMenuItem3: {
          type: "elMenuItemType",
          disabled: true,
          index: "3",
          icon: "el-icon-document",
          text: "Navigator Three",
        },
        elMenuItem4: {
          type: "elMenuItemType",
          disabled: false,
          index: "4",
          icon: "el-icon-setting",
          text: "Navigator Four",
        },
        elCustomMenuTitle1: {
          type: "customMenuTitle",
          icon: "el-icon-location",
          text: "Navigator One",
        },
        elNotificationType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elNotificationType2: {
          tag: "span",
          text: "With types",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elNotificationType3: {
          tag: "span",
          text: "Custom position",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elNotificationType4: {
          tag: "span",
          text: "With offset",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elNotificationType5: {
          tag: "span",
          text: "Use HTML string",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elNotificationType6: {
          tag: "span",
          text: "Hide close button",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elMessageBoxType1: {
          tag: "span",
          text: "Alert",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elMessageBoxType2: {
          tag: "span",
          text: "Confirm",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elMessageBoxType3: {
          tag: "span",
          text: "Prompt",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elMessageBoxType4: {
          tag: "span",
          text: "Customization",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elMessageBoxType5: {
          tag: "span",
          text: "Use HTML String",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elMessageBoxType6: {
          tag: "span",
          text: "Distinguishing cancel and close",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elMessageBoxType7: {
          tag: "span",
          text: "Centered content",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elMessageType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elMessageType2: {
          tag: "span",
          text: "Types",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elMessageType3: {
          tag: "span",
          text: "Closable",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elMessageType4: {
          tag: "span",
          text: "Centered text",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elMessageType5: {
          tag: "span",
          text: "Use HTML string",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elLoadingType1: {
          tag: "span",
          text: "Loading inside a container",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elLoadingType2: {
          tag: "span",
          text: "Customization",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elLoadingType3: {
          tag: "span",
          text: "Full screen loading",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elAlertType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elAlertType2: {
          tag: "span",
          text: "Theme",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elAlertType3: {
          tag: "span",
          text: "Customizable close button",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elAlertType4: {
          tag: "span",
          text: "With icon",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elAlertType5: {
          tag: "span",
          text: "Centered text",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elAlertType6: {
          tag: "span",
          text: "With description",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elAlertType7: {
          tag: "span",
          text: "With icon and description",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elResultType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elResultType2: {
          tag: "span",
          text: "Customized content",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elDescriptionType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elDescriptionType2: {
          tag: "span",
          text: "Sizes",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elDescriptionType3: {
          tag: "span",
          text: "Vertical List",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elDescriptionType4: {
          tag: "span",
          text: "Customized Style",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elEmptyType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elEmptyType2: {
          tag: "span",
          text: "Custom image",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elEmptyType3: {
          tag: "span",
          text: "Image size",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elEmptyType4: {
          tag: "span",
          text: "Bottom content",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elSkeletonType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elSkeletonType2: {
          tag: "span",
          text: "Configurable Rows",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elSkeletonType3: {
          tag: "span",
          text: "Animation",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elSkeletonType4: {
          tag: "span",
          text: "Customized Template",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elSkeletonType5: {
          tag: "span",
          text: "Loading state",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elSkeletonType6: {
          tag: "span",
          text: "Rendering a list of data",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elSkeletonRenderingListType: {
          type: "elSkeletonRenderingList",
          currentDate: "2021-06-01",
          skeletonList: [
            {
              imgUrl:
                "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
              name: "Deer",
            },
            {
              imgUrl:
                "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
              name: "Horse",
            },
            {
              imgUrl:
                "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
              name: "Mountain Lion",
            },
          ],
        },
        elSkeletonType7: {
          tag: "span",
          text: "Avoiding rendering bouncing.",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elBadgeType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elDropdownBadgeType: {
          type: "basicUsageBtn",
          text: "Click Me",
        },
        elBadgeType2: {
          tag: "span",
          text: "Max value",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elBadgeType3: {
          tag: "span",
          text: "Customizations",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elBadgeType4: {
          tag: "span",
          text: "Little red dot",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elBadgeLittleRedDotText: {
          tag: "span",
          text: "query",
        },
        elPaginationType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elPaginationType2: {
          tag: "span",
          text: "Number of pagers",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elPaginationType3: {
          tag: "span",
          text: "Buttons with background color",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elPaginationType4: {
          tag: "span",
          text: "Small Pagination",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elPaginationType5: {
          tag: "span",
          text: "More elements",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elPaginationTypeMoreElement1: {
          tag: "span",
          text: "Total item count",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elPaginationTypeMoreElement2: {
          tag: "span",
          text: "Change page size",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elPaginationTypeMoreElement3: {
          tag: "span",
          text: "Jump to",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elPaginationTypeMoreElement4: {
          tag: "span",
          text: "All combined",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elPaginationType5: {
          tag: "span",
          text: "Hide pagination when there is only one page",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTreeType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTreeType2: {
          tag: "span",
          text: "Selectable",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTreeType3: {
          tag: "span",
          text: "Custom leaf node in lazy mode",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTreeType4: {
          tag: "span",
          text: "Disabled checkbox",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTreeType5: {
          tag: "span",
          text: "Default expanded and default checked",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTreeType6: {
          tag: "span",
          text: "Checking tree nodes",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTreeType7: {
          tag: "span",
          text: "Custom node content",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTreeType7Render: {
          tag: "span",
          text: "Using render-content",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTreeType7Slot: {
          tag: "span",
          text: "Using scoped slot",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTreeTypeUsingScopedSlot: {
          type: "usingScopedSlot",
          text: "Click Me",
        },
        elTreeType8: {
          tag: "span",
          text: "Tree node filtering",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTreeType9: {
          tag: "span",
          text: "Accordion",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTreeType10: {
          tag: "span",
          text: "Draggable",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elProgressType1: {
          tag: "span",
          text: "Linear progress bar",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elProgressType2: {
          tag: "span",
          text: "Internal percentage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elProgressType3: {
          tag: "span",
          text: "Custom color",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elProgressType4: {
          tag: "span",
          text: "Circular progress bar",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elProgressType5: {
          tag: "span",
          text: "Dashboard progress bar",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTagType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTagType2: {
          tag: "span",
          text: "Removable Tag",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elRemovableTag: {
          type: "removableTag",
          tags: [
            { name: "Tag 1", type: "" },
            { name: "Tag 2", type: "success" },
            { name: "Tag 3", type: "info" },
            { name: "Tag 4", type: "warning" },
            { name: "Tag 5", type: "danger" },
          ],
        },
        elTagType3: {
          tag: "span",
          text: "Edit Dynamically",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elDynamicallyTag: {
          type: "dynamicallyTag",
          dynamicTags: ["Tag 1", "Tag 2", "Tag 3"],
          inputVisible: false,
          inputValue: "",
        },
        elTagType4: {
          tag: "span",
          text: "Sizes",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTagType5: {
          tag: "span",
          text: "Theme",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elThemeTag: {
          type: "themeTag",
          items: [
            { type: "", label: "Tag 1" },
            { type: "success", label: "Tag 2" },
            { type: "info", label: "Tag 3" },
            { type: "danger", label: "Tag 4" },
            { type: "warning", label: "Tag 5" },
          ],
          effectType1: "Dark",
          effectType2: "Plain",
        },
        elTableType1: {
          tag: "span",
          text: "Basic table",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTableType2: {
          tag: "span",
          text: "Striped Table",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTableType3: {
          tag: "span",
          text: "Table with border",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTableType4: {
          tag: "span",
          text: "Table with status",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTableType5: {
          tag: "span",
          text: "Table with fixed header",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTableType6: {
          tag: "span",
          text: "Table with fixed column",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTableFixedColumn: {
          type: "fixedColumn",
          eventName1: "Detail",
          eventName2: "Edit",
        },
        elTableType7: {
          tag: "span",
          text: "Table with fixed columns and header",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTableType8: {
          tag: "span",
          text: "Fluid-height Table with fixed header (and columns)",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTableFixedHeaderAndColumn: {
          type: "fixedHeaderAndColumn",
          eventName: "Remove",
          event: "deleteFixedHeaderAndColumn",
        },
        elTableType9: {
          tag: "span",
          text: "Grouping table head",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTableType10: {
          tag: "span",
          text: "Single select",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTableType11: {
          tag: "span",
          text: "Multiple select",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elMultipleSelectType: {
          type: "customProp",
          prop: "date",
        },
        elTableType12: {
          tag: "span",
          text: "Sorting",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTableType13: {
          tag: "span",
          text: "Filter",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTableType14: {
          tag: "span",
          text: "Custom column template",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTableType15: {
          tag: "span",
          text: "Table with custom header",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elCustomHeader: {
          type: "customHeader",
          size: "mini",
          placeholder: "Type to search",
        },
        elTableType16: {
          tag: "span",
          text: "Expandable row",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTableType17: {
          tag: "span",
          text: "Tree data and lazy mode",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTableType18: {
          tag: "span",
          text: "Summary row",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTableShowSummaryTableType: {
          type: "showSummaryTable",
        },
        elTableType19: {
          tag: "span",
          text: "Rowspan and colspan",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTableRowspanTableType: {
          type: "rowspanTable",
        },
        elTableColspanTableType: {
          type: "colspanTable",
        },
        elTableType20: {
          tag: "span",
          text: "Custom index",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elFormType1: {
          tag: "span",
          text: "Basic form",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elFormType2: {
          tag: "span",
          text: "Inline form",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elFormType3: {
          tag: "span",
          text: "Alignment",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elFormAlignmentType: {
          type: "alignmentRadio",
        },
        elFormType4: {
          tag: "span",
          text: "Validation",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elFormType5: {
          tag: "span",
          text: "Custom validation rules",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elFormType6: {
          tag: "span",
          text: "Delete or add form items dynamically",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elFormDynamically: {
          type: "formDynamically",
          rules: {
            required: true,
            message: "domain can not be null",
            trigger: "blur",
          },
        },
        elFormType7: {
          tag: "span",
          text: "Number Validate",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elFormType8: {
          tag: "span",
          text: "Size control",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elTransferType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elBasicUsageTransfer: {
          type: "basicUsageTransfer",
        },
        elTransferType2: {
          tag: "span",
          text: "Filterable",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elFilterableTransfer: {
          type: "filterableTransfer",
        },
        elTransferType3: {
          tag: "span",
          text: "Customizable",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elCustomizableTransfer: {
          type: "customizableTransfer",
        },
        elTransferType4: {
          tag: "span",
          text: "Prop aliases",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elPropAliasesTransfer: {
          type: "propAliasesTransfer",
        },
        iconAttribute: {
          type: "iconAttribute",
        },
        elSelectType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elSelectType2: {
          tag: "span",
          text: "Disabled option",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elSelectType3: {
          tag: "span",
          text: "Disabled select",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elSelectType4: {
          tag: "span",
          text: "Clearable single select",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elSelectType5: {
          tag: "span",
          text: "Basic multiple select",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elSelectType6: {
          tag: "span",
          text: "Custom template",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elSelectType7: {
          tag: "span",
          text: "Grouping",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elSelectType8: {
          tag: "span",
          text: "Option filtering",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elSelectType9: {
          tag: "span",
          text: "Remote Search",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elSelectType10: {
          tag: "span",
          text: "Create new items",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elCascaderType2: {
          tag: "span",
          text: "Disabled option",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elCascaderType3: {
          tag: "span",
          text: "Clearable",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elCascaderType4: {
          tag: "span",
          text: "Display only the last level",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elCascaderType5: {
          tag: "span",
          text: "Multiple Selection",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elCascaderType6: {
          tag: "span",
          text: "Select any level of options",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elCascaderType7: {
          tag: "span",
          text: "Dynamic loading",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elCascaderType8: {
          tag: "span",
          text: "Filterable",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elCascaderType9: {
          tag: "span",
          text: "Custom option content",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elCascaderType10: {
          tag: "span",
          text: "Cascader panel",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elCascaderType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elSwitchType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elSwitchType2: {
          tag: "span",
          text: "Text description",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elSwitchType3: {
          tag: "span",
          text: "Extended value types",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elSwitchExtendedValueTypes: {
          type: "extendedValueTypes",
        },
        elSwitchType4: {
          tag: "span",
          text: "Disabled",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elSliderType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elSliderType2: {
          tag: "span",
          text: "Discrete values",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elSliderType3: {
          tag: "span",
          text: "Slider with input box",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elSliderType4: {
          tag: "span",
          text: "Range selection",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elSliderType5: {
          tag: "span",
          text: "Vertical mode",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elSliderType6: {
          tag: "span",
          text: "Show marks",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elTimePickerType1: {
          tag: "span",
          text: "Fixed time picker",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elTimePickerType2: {
          tag: "span",
          text: "Arbitrary time picker",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elTimePickerType3: {
          tag: "span",
          text: "Fixed time range",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elTimePickerType4: {
          tag: "span",
          text: "Arbitrary time range",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elFixedTimeRangeEndTimeType: {
          type: "fixedTimeRangeEndTimeType",
        },
        elDatePickerType1: {
          tag: "span",
          text: "Enter Date",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elDatePickerType2: {
          tag: "span",
          text: "Other measurements",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elDatePickerType3: {
          tag: "span",
          text: "Date Range",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elDatePickerType4: {
          tag: "span",
          text: "Month Range",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elDatePickerType5: {
          tag: "span",
          text: "Default Value",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elDateTimePickerType1: {
          tag: "span",
          text: "Date and time",
          style: {
            margin: "15px",
            display: "block",
          },
        },
        elDateTimePickerType2: {
          tag: "span",
          text: "Date and time range",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elDateTimePickerType3: {
          tag: "span",
          text: "Default time value for start date and end date",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elUploadType1: {
          tag: "span",
          text: "Click to upload files",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elUploadType2: {
          tag: "span",
          text: "User avatar upload",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elUploadType3: {
          tag: "span",
          text: "Photo Wall",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elUploadType4: {
          tag: "span",
          text: "Custom file thumbnail",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elCustomFileThumbnail: {
          type: "customFileThumbnail",
        },
        elUploadType5: {
          tag: "span",
          text: "FileList with thumbnail",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elFileListWithThumbnailTip: {
          type: "fileListWithThumbnailTip",
        },
        elUploadType6: {
          tag: "span",
          text: "File list control",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elUploadType7: {
          tag: "span",
          text: "Drag to upload",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elManualUploadTrigger: {
          type: "manualUploadTrigger",
        },
        elManualUploadServer: {
          type: "manualUploadServer",
        },
        elUploadDropFileText: {
          type: "dropFileText",
        },
        elUploadDropFileIcon: {
          type: "iconUploadAttribute",
        },
        elUploadType8: {
          tag: "span",
          text: "Manual upload",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elRateType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elRateType2: {
          tag: "span",
          text: "With text",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elRateType3: {
          tag: "span",
          text: "More icons",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elRateType4: {
          tag: "span",
          text: "Read-only",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elColorPickerType1: {
          tag: "span",
          text: "Basic usage",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elColorPickerType2: {
          tag: "span",
          text: "Alpha",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elColorPickerType3: {
          tag: "span",
          text: "Predefined colors",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
        elColorPickerType4: {
          tag: "span",
          text: "Sizes",
          style: {
            margin: "15px 0",
            display: "block",
          },
        },
      },
      elrate: {
        basicUsageValue1: null,
        basicUsageValue2: null,
        withTextValue: null,
        moreIconValue: null,
        readOnlyValue: 3.7,
        basicUsageColors: ["#99A9BF", "#F7BA2A", "#FF9900"],
        texts: [
          "Very poor ",
          " disappointed ",
          "average ",
          " satisfied ",
          "surprised",
        ],
        withText: ["oops", "disappointed", "normal", "good", "great"],
        iconClasses: ["el-icon-star-on", "el-icon-star-on", "el-icon-star-on"],
        moreIconClasses: [
          "icon-rate-face-1",
          "icon-rate-face-2",
          "icon-rate-face-3",
        ], // same as { 2: 'icon-rate-face-1', 4: { value: 'icon-rate-face-2', excluded: true }, 5: 'icon-rate-face-3' }
      },
      elavatar: {},
      elcard: {
        bodyStyle: { padding: "0px", marginBottom: "1px" },
      },
      elskeleton: {
        elskeletonLoading: false,
        basicUsageLoading: true,
      },
      img: {
        attrs: {
          src: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
        },
        props: {
          src: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
        },
      },
      eldescriptions: {
        labelStyle: {},
        contentStyle: {},
      },

      elcolorpicker: {
        basicUsageColor1: "#409EFF",
        basicUsageColor2: null,
        alphaColor: "rgba(19, 206, 102, 0.8)",
        predefine: [],
        predefinedColor: "rgba(255, 69, 0, 0.68)",
        predefineColorList: [
          "#ff4500",
          "#ff8c00",
          "#ffd700",
          "#90ee90",
          "#00ced1",
          "#1e90ff",
          "#c71585",
          "rgba(255, 69, 0, 0.68)",
          "rgb(255, 120, 0)",
          "hsv(51, 100, 98)",
          "hsva(120, 40, 94, 0.5)",
          "hsl(181, 100%, 37%)",
          "hsla(209, 100%, 56%, 0.73)",
          "#c7158577",
        ],
      },
      eltransfer: {
        data: generateData(),
        value: [1, 4],
        buttonTexts: [],
        titles: [],
        leftDefaultChecked: [],
        rightDefaultChecked: [],
        format: {
          noChecked: "${checked}/${total}",
          hasChecked: "${checked}/${total}",
        },
        props: {
          label: "label",
          key: "key",
          disabled: "disabled",
        }, //必须
        defaultChecked: [2, 3],
        renderContent(h, option) {
          //return <span>{ option.key } - { option.label }</span>
          return "123456";
        },
        filterableData: generateFilterableData(),
        filterableValue: [],

        // Customizable
        customizableValueData: generateCustomizableData(),
        customizableValue: [1],
        customizableValue4: [1],
        customizableRenderFunc(h, option) {
          return (
            <span>
              {option.key} - {option.label}
            </span>
          );
        },
        propAliasesData: generateCustomizableData(),
        propAliasesValue: [],
        propAliasesProps: "{key: 'value',label: 'desc'}",
      },
      eltable: {
        tableData: [
          {
            date: "2016-05-03",
            name: "Tom",
            address: "No. 189, Grove St, Los Angeles",
          },
          {
            date: "2016-05-02",
            name: "Tom",
            address: "No. 189, Grove St, Los Angeles",
          },
          {
            date: "2016-05-04",
            name: "Tom",
            address: "No. 189, Grove St, Los Angeles",
          },
          {
            date: "2016-05-01",
            name: "Tom",
            address: "No. 189, Grove St, Los Angeles",
          },
        ],
        data: [
          {
            date: "2016-05-02",
            name: "Jack",
            address: "New York City",
          },
          {
            date: "2016-05-04",
            name: "Jack",
            address: "New York City",
          },
          {
            date: "2016-05-01",
            name: "Jack",
            address: "New York City",
          },
          {
            date: "2016-05-03",
            name: "Jack",
            address: "New York City",
          },
        ],
        tableMultipleData: [
          {
            date: "2016-05-03",
            name: "Tom",
            address: "No. 189, Grove St, Los Angeles",
          },
          {
            date: "2016-05-02",
            name: "Tom",
            address: "No. 189, Grove St, Los Angeles",
          },
          {
            date: "2016-05-04",
            name: "Tom",
            address: "No. 189, Grove St, Los Angeles",
          },
          {
            date: "2016-05-01",
            name: "Tom",
            address: "No. 189, Grove St, Los Angeles",
          },
          {
            date: "2016-05-08",
            name: "Tom",
            address: "No. 189, Grove St, Los Angeles",
          },
          {
            date: "2016-05-06",
            name: "Tom",
            address: "No. 189, Grove St, Los Angeles",
          },
          {
            date: "2016-05-07",
            name: "Tom",
            address: "No. 189, Grove St, Los Angeles",
          },
        ],
        multipleAttributeTableData: [
          {
            date: "2016-05-03",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
            tag: "Home",
          },
          {
            date: "2016-05-02",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
            tag: "Office",
          },
          {
            date: "2016-05-04",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
            tag: "Home",
          },
          {
            date: "2016-05-01",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
            tag: "Office",
          },
        ],
        tableDataColumnHeader: [
          {
            date: "2016-05-03",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
          },
          {
            date: "2016-05-02",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
          },
          {
            date: "2016-05-04",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
          },
          {
            date: "2016-05-01",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
          },
          {
            date: "2016-05-08",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
          },
          {
            date: "2016-05-06",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
          },
          {
            date: "2016-05-07",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
          },
        ],
        tableData3: [
          {
            date: "2016-05-03",
            name: "Tom",
            address: "No. 189, Grove St, Los Angeles",
            tag: "Home",
          },
          {
            date: "2016-05-02",
            name: "Tom",
            address: "No. 189, Grove St, Los Angeles",
            tag: "Office",
          },
          {
            date: "2016-05-04",
            name: "Tom",
            address: "No. 189, Grove St, Los Angeles",
            tag: "Home",
          },
          {
            date: "2016-05-01",
            name: "Tom",
            address: "No. 189, Grove St, Los Angeles",
            tag: "Office",
          },
        ],
        tableData8: [
          {
            date: "2016-05-03",
            name: "Tom",
            address: "No. 189, Grove St, Los Angeles",
          },
          {
            date: "2016-05-02",
            name: "John",
            address: "No. 189, Grove St, Los Angeles",
          },
          {
            date: "2016-05-04",
            name: "Morgan",
            address: "No. 189, Grove St, Los Angeles",
          },
          {
            date: "2016-05-01",
            name: "Jessy",
            address: "No. 189, Grove St, Los Angeles",
          },
        ],
        tableData9: [
          {
            id: 1,
            date: "2016-05-03",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
          },
          {
            id: 2,
            date: "2016-05-02",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
          },
          {
            id: 3,
            date: "2016-05-04",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
          },
          {
            id: 4,
            date: "2016-05-01",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
          },
          {
            id: 5,
            date: "2016-05-08",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
          },
          {
            id: 6,
            date: "2016-05-06",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
          },
          {
            id: 7,
            date: "2016-05-07",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
          },
        ],
        tableData10: [
          {
            id: 1,
            date: "2016-05-02",
            name: "wangxiaohu",
          },
          {
            id: 2,
            date: "2016-05-04",
            name: "wangxiaohu",
          },
          {
            id: 3,
            date: "2016-05-01",
            name: "wangxiaohu",
            children: [
              {
                id: 31,
                date: "2016-05-01",
                name: "wangxiaohu",
              },
              {
                id: 32,
                date: "2016-05-01",
                name: "wangxiaohu",
              },
            ],
          },
          {
            id: 4,
            date: "2016-05-03",
            name: "wangxiaohu",
          },
        ],
        tableData11: [
          {
            id: 1,
            date: "2016-05-02",
            name: "wangxiaohu",
          },
          {
            id: 2,
            date: "2016-05-04",
            name: "wangxiaohu",
          },
          {
            id: 3,
            date: "2016-05-01",
            name: "wangxiaohu",
            hasChildren: true,
          },
          {
            id: 4,
            date: "2016-05-03",
            name: "wangxiaohu",
          },
        ],
        tableData12: [
          {
            id: "12987122",
            name: "Tom",
            amount1: "234",
            amount2: "3.2",
            amount3: 10,
          },
          {
            id: "12987123",
            name: "Tom",
            amount1: "165",
            amount2: "4.43",
            amount3: 12,
          },
          {
            id: "12987124",
            name: "Tom",
            amount1: "324",
            amount2: "1.9",
            amount3: 9,
          },
          {
            id: "12987125",
            name: "Tom",
            amount1: "621",
            amount2: "2.2",
            amount3: 17,
          },
          {
            id: "12987126",
            name: "Tom",
            amount1: "539",
            amount2: "4.1",
            amount3: 15,
          },
        ],
        rowStyle: {},
        cellStyle: {},
        headerRowStyle: {},
        headerCellStyle: {},
        expandRowKeys: [],
        defaultSort: {},
        treeProps: {
          hasChildren: "hasChildren",
          children: "children",
        },
        attrs: {
          "element-loading-text": "loading",
          "element-loading-spinner": "el-icon-loading",
          "element-loading-background": "rgba(0, 0, 0, 0.8)",
        },
        defaultSorting: { prop: "date", order: "descending" },
      },
      eltablecolumn: {
        filterPlacement: "",
        filteredValue: [],
        filters: [],
        sortOrders: ["ascending", "descending", null],
      },
      elformList: {
        model: {
          name: "",
          region: "",
          date1: "",
          date2: "",
          delivery: false,
          type: [],
          resource: "",
          desc: "",
        },
        rules: {
          name: [
            {
              required: true,
              message: "Please input Activity name",
              trigger: "blur",
            },
            {
              min: 3,
              max: 5,
              message: "Length should be 3 to 5",
              trigger: "blur",
            },
          ],
          region: [
            {
              required: true,
              message: "Please select Activity zone",
              trigger: "change",
            },
          ],
          date1: [
            {
              type: "date",
              required: true,
              message: "Please pick a date",
              trigger: "change",
            },
          ],
          date2: [
            {
              type: "date",
              required: true,
              message: "Please pick a time",
              trigger: "change",
            },
          ],
          type: [
            {
              type: "array",
              required: true,
              message: "Please select at least one activity type",
              trigger: "change",
            },
          ],
          resource: [
            {
              required: true,
              message: "Please select activity resource",
              trigger: "change",
            },
          ],
          desc: [
            {
              required: true,
              message: "Please input activity form",
              trigger: "blur",
            },
          ],
        },
      },
      elselectForm: {
        ElOptionListName: [
          {
            value: "shanghai",
            label: "Zone one",
          },
          {
            value: "beijing",
            label: "Zone two",
          },
        ],
      },
      eltree: {
        selectableCount: 1,
        selectableProps: {
          label: "name",
          children: "zones",
        },

        customLazyProps: {
          label: "name",
          children: "zones",
          isLeaf: "leaf",
        },

        data: [
          {
            label: "Level one 1",
            children: [
              {
                label: "Level two 1-1",
                children: [
                  {
                    label: "Level three 1-1-1",
                  },
                ],
              },
            ],
          },
          {
            label: "Level one 2",
            children: [
              {
                label: "Level two 2-1",
                children: [
                  {
                    label: "Level three 2-1-1",
                  },
                ],
              },
              {
                label: "Level two 2-2",
                children: [
                  {
                    label: "Level three 2-2-1",
                  },
                ],
              },
            ],
          },
          {
            label: "Level one 3",
            children: [
              {
                label: "Level two 3-1",
                children: [
                  {
                    label: "Level three 3-1-1",
                  },
                ],
              },
              {
                label: "Level two 3-2",
                children: [
                  {
                    label: "Level three 3-2-1",
                  },
                ],
              },
            ],
          },
        ],
        defaultProps: {
          children: "children",
          label: "label",
        },
        defaultCheckedKeys: [],
        defaultExpandedKeys: [],

        // elTreeType5
        defaultKeyData: [
          {
            id: 1,
            label: "Level one 1",
            children: [
              {
                id: 4,
                label: "Level two 1-1",
                children: [
                  {
                    id: 9,
                    label: "Level three 1-1-1",
                  },
                  {
                    id: 10,
                    label: "Level three 1-1-2",
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            label: "Level one 2",
            children: [
              {
                id: 5,
                label: "Level two 2-1",
              },
              {
                id: 6,
                label: "Level two 2-2",
              },
            ],
          },
          {
            id: 3,
            label: "Level one 3",
            children: [
              {
                id: 7,
                label: "Level two 3-1",
              },
              {
                id: 8,
                label: "Level two 3-2",
              },
            ],
          },
        ],
        treeTypeDefaultCheckedKeys: [5],
        treeTypeDefaultExpandedKeys: [2, 3],
        disabledCheckboxData: [
          {
            id: 1,
            label: "Level one 1",
            children: [
              {
                id: 3,
                label: "Level two 2-1",
                children: [
                  {
                    id: 4,
                    label: "Level three 3-1-1",
                  },
                  {
                    id: 5,
                    label: "Level three 3-1-2",
                    disabled: true,
                  },
                ],
              },
              {
                id: 2,
                label: "Level two 2-2",
                disabled: true,
                children: [
                  {
                    id: 6,
                    label: "Level three 3-2-1",
                  },
                  {
                    id: 7,
                    label: "Level three 3-2-2",
                    disabled: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      elprogress: {
        percentage: 10,
        customColor: "#409eff",
        colors: [
          { color: "#f56c6c", percentage: 20 },
          { color: "#e6a23c", percentage: 40 },
          { color: "#5cb87a", percentage: 60 },
          { color: "#1989fa", percentage: 80 },
          { color: "#6f7ad3", percentage: 100 },
        ],
        // elprogress组件color属性值需通过orderVal形式设置（支持自定义属性，自定义方法）
      },
      elpagination: {
        pageSizes: [10, 20, 30, 40],
        pageSizes2: [100, 200, 300, 400],
      },
      elbadge: {
        value: 12,
      },
      elavatar: {
        size: "",
        src: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      },
      elmenu: {
        defaultActive: "1",
      },
      eltabs: {
        activeName: "first",
      },
      elsteps: {
        active: 0,
      },
      eltooltip: {
        popperOptions: { boundariesElement: "body", gpuAcceleration: false },
      },
      eldialog: {
        visible: false,
      },
      elcollapse: {
        value: ["1"],
      },
      elcalendar: {
        value: new Date(),
        range: ["2019-03-04", "2019-03-24"],
      },
      elimage: {
        src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        previewSrcList: [
          "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        ],
      },

      // 自定义value
      elDescriptionRadio: "", // Descriptions-Sizes

      // 自定义value
      elPaginationSwitchVal: true, // Descriptions-Sizes

      // 自定义value
      treeNodeFiltering: "", // Tree-Tree node filtering

      dateFilter: [
        { text: "2016-05-01", value: "2016-05-01" },
        { text: "2016-05-02", value: "2016-05-02" },
        { text: "2016-05-03", value: "2016-05-03" },
        { text: "2016-05-04", value: "2016-05-04" },
      ],

      tagFilter: [
        { text: "Home", value: "Home" },
        { text: "Office", value: "Office" },
      ],

      searchHeaderVal: "",
      alignmentLabelPosition: "right",
    };
  },
  watch: {
    "elformList.model.region": function (val, oldVal) {
      console.log("elformList.model.region====>");
      console.log(val, oldVal);
    },
    "elformList.model.type": function (val, oldVal) {
      console.log("elformList.model.type====>");
      console.log(val, oldVal);
      console.log(Array.isArray(val));
    },
    "elprogress.percentage": function (val, oldVal) {
      console.log("elprogress.percentage====>");
      console.log(val, oldVal);
    },
    treeNodeFiltering(val) {
      console.log("treeNodeFiltering");
      console.log(val);
      var filterTreeRefComponent = getVueComponent(
        this,
        "$children",
        "$refs",
        "filterTreeRef"
      );
      filterTreeRefComponent.filter(val);
      console.log(filterTreeRefComponent);
    },
  },
  computed: {
    customHeaderTableData() {
      return this.eltable.tableData8.filter(
        (data) =>
          !this.searchHeaderVal ||
          data.name.toLowerCase().includes(this.searchHeaderVal.toLowerCase())
      );
    },
  },
  mounted() {
    this.elskeleton.elskeletonLoading = false;
  },
  methods: {
    load() {},
    loadSelectableNode(node, resolve) {
      console.log("eltree");
      console.log(node, resolve);
      if (node.level === 0) {
        return resolve([{ name: "Root1" }, { name: "Root2" }]);
      }
      if (node.level > 3) return resolve([]);

      var hasChild;
      if (node.data.name === "region1") {
        hasChild = true;
      } else if (node.data.name === "region2") {
        hasChild = false;
      } else {
        hasChild = Math.random() > 0.5;
      }

      setTimeout(() => {
        var data;
        if (hasChild) {
          data = [
            {
              name: "zone" + this.eltree.selectableCount++,
            },
            {
              name: "zone" + this.eltree.selectableCount++,
            },
          ];
        } else {
          data = [];
        }

        resolve(data);
      }, 500);
    },
    loadCustomLazyNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "region" }]);
      }
      if (node.level > 1) return resolve([]);

      setTimeout(() => {
        const data = [
          {
            name: "leaf",
            leaf: true,
          },
          {
            name: "zone",
          },
        ];

        resolve(data);
      }, 500);
    },
    renderHeader(h, { column, $index }) {
      return column.label;
    },
    formatter(row, column, cellValue, index) {
      return cellValue;
    },
    selectable(row, index) {
      return row;
    },
    filterMethod() {
      //return true; //为Transfer组件时必须返回真值才能回显数据
    },
    beforeFilter() {},
    formatTooltip() {},
    onRemove(file, fileList) {
      console.log(file, fileList);
    },
    onPreview(file) {
      console.log(file);
    },
    onExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    photoWallPreview(file) {
      console.log("photoWallPreview");
      console.log(file);
      this.elupload.photoWallImageUrl = file.url;
      this.getVueComponentName("photoWallDialogVisible", "visible", true);
    },

    httpRequest() {},
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    onChange(file) {
      console.log(file);
      console.log("change方法");
      this.imageUrl = URL.createObjectURL(file.raw);
      this.customcontent.imageAttribute.props.src = URL.createObjectURL(
        file.raw
      );
      console.log(this.imageUrl);
    },
    onSuccess(res, file) {
      console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    onProgress() {},
    onError() {},
    rowKey(row) {
      return row.staffTypeId;
    },
    changeElskeletonLoadingState(val) {
      // change Loading state
      this.getVueComponentName("elskeletonLoadingState", "loading", val);
    },
    changeElskeletonRenderingBouncingLoadingState(val) {
      // change Loading state
      this.getVueComponentName(
        "elskeletonRenderingBouncingLoadingState",
        "loading",
        val
      );
    },
    changeElskeletonRenderingListLoadingState() {
      // change Loading state
      this.getVueComponentName("elskeletonRenderingListRef", "loading", true);
      setTimeout(
        () =>
          this.getVueComponentName(
            "elskeletonRenderingListRef",
            "loading",
            false
          ),
        2000
      );
    },
    formSubmit(formName) {
      var resetForm = getVueComponent(this, "$children", "$refs", formName);
      resetForm.validate((valid) => {
        console.log(valid);
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    formCancel(formName) {
      var resetForm = getVueComponent(this, "$children", "$refs", formName);
      resetForm.resetFields();
    },
    filterNodeMethod() {
      return true;
    },
    renderContentTree(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      );
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    },
    allowDrop() {},

    customColorMethod(percentage) {
      if (percentage < 30) {
        return "#909399";
      } else if (percentage < 70) {
        return "#e6a23c";
      } else {
        return "#67c23a";
      }
    },
    formatPercentage(percentage) {
      console.log("format方法");
      console.log(percentage);
      return percentage === 100 ? "Full" : `${percentage}%`;
    },
    increase(refName) {
      let percentageVal = this.elprogress;
      percentageVal.percentage += 10;
      if (percentageVal.percentage > 100) {
        percentageVal.percentage = 100;
      }

      if (refName) {
        this.getVueComponentName(
          refName,
          "percentage",
          percentageVal.percentage
        );
      } else {
        this.getVueComponentName(
          "elProgressBar1",
          "percentage",
          percentageVal.percentage
        );
        this.getVueComponentName(
          "elProgressBar2",
          "percentage",
          percentageVal.percentage
        );
        this.getVueComponentName(
          "elProgressBar3",
          "percentage",
          percentageVal.percentage
        );
      }
    },

    formatElProgress(percentage) {
      return percentage === 100 ? "Full" : `${percentage}%`;
    },

    decrease(refName) {
      let percentageVal = this.elprogress;
      percentageVal.percentage -= 10;
      if (percentageVal.percentage < 0) {
        percentageVal.percentage = 0;
      }

      if (refName) {
        this.getVueComponentName(
          refName,
          "percentage",
          percentageVal.percentage
        );
      } else {
        this.getVueComponentName(
          "elProgressBar1",
          "percentage",
          percentageVal.percentage
        );
        this.getVueComponentName(
          "elProgressBar2",
          "percentage",
          percentageVal.percentage
        );
        this.getVueComponentName(
          "elProgressBar3",
          "percentage",
          percentageVal.percentage
        );
      }
    },
    openShowMessageType() {
      this.$message("This is a message.");
    },

    openVNodeType() {
      const h = this.$createElement;
      this.$message({
        message: h("p", null, [
          h("span", null, "Message can be "),
          h("i", { style: "color: teal" }, "VNode"),
        ]),
      });
    },
    openMessageSuccessType() {
      this.openMessageTypeList("success");
    },
    openMessageWarningType() {
      this.openMessageTypeList("warning");
    },
    openMessageDefaultType() {
      this.openMessageTypeList("message");
    },
    openMessageErrorType() {
      this.openMessageTypeList("error");
    },
    openMessageTypeList(type) {
      if (type == "message") {
        this.$message("This is a message.");
      } else if (type == "error") {
        this.$message.error("Oops, this is a error message.");
      } else {
        this.$message({
          message:
            type == "success"
              ? "Congrats"
              : "Warning" + ", this is a " + type + " message.",
          type: type,
        });
      }
    },

    openMessageClosableMessageType() {
      let content = "This is a message.";
      this.openMessageClosableTypeList("message", content);
    },
    openMessageClosableSuccessType() {
      let content = "Congrats, this is a success message.";
      this.openMessageClosableTypeList("success", content);
    },
    openMessageClosableWarningType() {
      let content = "Warning, this is a warning message.";
      this.openMessageClosableTypeList("warning", content);
    },
    openMessageClosableErrorType() {
      let content = "Oops, this is a error message.";
      this.openMessageClosableTypeList("error", content);
    },

    openMessageClosableTypeList(type, content) {
      this.$message({
        showClose: true,
        message: content,
        type: type,
      });
    },

    openMessageCenteredText() {
      this.$message({
        message: "Centered text",
        center: true,
      });
    },

    openMessageUseHTMLString() {
      this.$message({
        dangerouslyUseHTMLString: true,
        message: "<strong>This is <i>HTML</i> string</strong>",
      });
    },

    openMessageBoxAlertType() {
      this.$alert("This is a message", "Title", {
        confirmButtonText: "OK",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    },
    openMessageBoxCustomizationtype() {
      const h = this.$createElement;
      this.$msgbox({
        title: "Message",
        message: h("p", null, [
          h("span", null, "Message can be "),
          h("i", { style: "color: teal" }, "VNode"),
        ]),
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "Loading...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        },
      }).then((action) => {
        this.$message({
          type: "info",
          message: "action: " + action,
        });
      });
    },
    openMessageBoxPromptType() {
      this.$prompt("Please input your e-mail", "Tip", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        inputPattern:
          /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: "Invalid Email",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "Your email is:" + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Input canceled",
          });
        });
    },
    openMessageBoxCustomizationType() {
      const h = this.$createElement;
      this.$msgbox({
        title: "Message",
        message: h("p", null, [
          h("span", null, "Message can be "),
          h("i", { style: "color: teal" }, "VNode"),
        ]),
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "Loading...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        },
      }).then((action) => {
        this.$message({
          type: "info",
          message: "action: " + action,
        });
      });
    },
    openMessageBoxUseHTMLStringType() {
      this.$alert(
        "<strong>This is <i>HTML</i> string</strong>",
        "HTML String",
        {
          dangerouslyUseHTMLString: true,
        }
      );
    },
    openMessageBoxDistinguishingCancelAndCloseType() {
      this.$confirm("You have unsaved changes, save and proceed?", "Confirm", {
        distinguishCancelAndClose: true,
        confirmButtonText: "Save",
        cancelButtonText: "Discard Changes",
      })
        .then(() => {
          this.$message({
            type: "info",
            message: "Changes saved. Proceeding to a new route.",
          });
        })
        .catch((action) => {
          this.$message({
            type: "info",
            message:
              action === "cancel"
                ? "Changes discarded. Proceeding to a new route."
                : "Stay in the current route",
          });
        });
    },
    openMessageBoxCenteredContentType() {
      this.$confirm(
        "This will permanently delete the file. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
          center: true,
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "Delete completed",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    openNotification1() {
      const h = this.$createElement;
      this.$notify({
        title: "Title",
        message: h("i", { style: "color: teal" }, "This is a reminder"),
      });
    },
    openNotification2() {
      this.$notify({
        title: "Prompt",
        message: "This is a message that does not automatically close",
        duration: 0,
      });
    },
    openNotificationSuccessType() {
      this.openNotificationType("success");
    },
    openNotificationWarningType() {
      this.openNotificationType("warning");
    },
    openNotificationInfoType() {
      this.openNotificationType("info");
    },
    openNotificationErrorType() {
      this.openNotificationType("error");
    },
    openNotificationType(type) {
      if (type == "info") {
        this.$notify.info({
          title: "Info",
          message: "This is an info message",
        });
      } else if (type == "error") {
        this.$notify.error({
          title: "Error",
          message: "This is an error message",
        });
      } else {
        this.$notify({
          title: "Error",
          message: "This is an " + type + " message",
          type: type,
        });
      }
    },
    openNotificationTopRightPostiton() {
      this.openNotificationPostitonType();
    },
    openNotificationBottomRightPostiton() {
      this.openNotificationPostitonType("bottom-right");
    },
    openNotificationBottomLeftPostiton() {
      this.openNotificationPostitonType("bottom-left");
    },
    openNotificationTopLeftPostiton() {
      this.openNotificationPostitonType("top-left");
    },
    openNotificationPostitonType(type) {
      if (type) {
        this.$notify({
          title: "Custom Position",
          message: "I'm at the bottom right corner",
          position: type,
        });
      } else {
        this.$notify({
          title: "Custom Position",
          message: "I'm at the top right corner",
        });
      }
    },
    openNotificationWithOffset() {
      this.$notify.success({
        title: "Success",
        message: "This is a success message",
        offset: 100,
      });
    },
    openNotificationUseHTMLString() {
      this.$notify({
        title: "HTML String",
        dangerouslyUseHTMLString: true,
        message: "<strong>This is <i>HTML</i> string</strong>",
      });
    },
    openNotificationHideCloseButton() {
      this.$notify.success({
        title: "Info",
        message: "This is a message without close button",
        showClose: false,
      });
    },

    openFullScreenLoading1() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    },
    openFullScreenLoading2() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    },

    stepNext() {
      /*
      该方法会直接修改VueComponent, error:Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "active"
      var refComponent = getVueComponent(this,'$children','$refs','elsteps');
      if (refComponent.active++ > 2){
        refComponent.active = 0;
      } else {
        refComponent.active ++;
      }
      */

      let elstepsVal = this.elsteps;
      if (elstepsVal.active++ > 2) {
        elstepsVal.active = 0;
      } else {
        elstepsVal.active++;
      }

      this.getVueComponentName("elsteps", "active", elstepsVal.active);
    },
    labelContent() {
      return "test";
    },
    beforeLeave(activeName, oldActiveName) {},
    elProgressFormat(percentage) {
      return percentage;
    },
    openBasicUsageDialog() {
      let visibleVal = this.eldialog;
      visibleVal.visible = true;
      this.getVueComponentName("eldialog", "visible", visibleVal.visible);
    },
    openCustomizationsDialog() {
      let visibleVal = this.eldialog;
      visibleVal.visible = true;
      this.getVueComponentName(
        "elCustomizationsDialog",
        "visible",
        visibleVal.visible
      );
    },
    openFormNestedDialog() {
      let visibleVal = this.eldialog;
      visibleVal.visible = true;
      this.getVueComponentName(
        "elFormNestedDialog",
        "visible",
        visibleVal.visible
      );
    },
    openOuterDialog() {
      let visibleVal = this.eldialog;
      visibleVal.visible = true;
      this.getVueComponentName("elOuterDialog", "visible", visibleVal.visible);
      this.getVueComponentName("elInnerDialog", "visible", false);
    },
    openInnerDialog() {
      let visibleVal = this.eldialog;
      visibleVal.visible = true;
      this.getVueComponentName("elInnerDialog", "visible", visibleVal.visible);
    },
    openCenteredContentDialog() {
      let visibleVal = this.eldialog;
      visibleVal.visible = true;
      this.getVueComponentName(
        "elCenteredContentDialog",
        "visible",
        visibleVal.visible
      );
    },
    //具备beforeClose方法的集合(所有关闭弹框事件取refName检索组件并修改组件值)
    beforeClose() {
      console.log("beforeClose======>");
      console.log(this);
      var closeComponentRefList = [
        "elDrawerRef",
        "eldialog",
        "elTableDrawerRef",
        "elNestedDrawerRef",
        "elInnerDrawerRef",
        "elCustomizationsDialog",
        "elFormNestedDialog",
        "elOuterDialog",
        "elInnerDialog",
        "elCenteredContentDialog",
        "photoWallDialogVisible",
        "customFileThumbnail",
      ];
      for (var i in closeComponentRefList) {
        var component = getVueComponent(
          this,
          "$children",
          "$refs",
          closeComponentRefList[i]
        );
        console.log(component);
        if (component.visible) {
          //为打开状态则关闭
          this.getVueComponentName(closeComponentRefList[i], "visible", false);
        }
      }
    },
    cancelDialog() {
      let visibleVal = this.eldialog;
      visibleVal.visible = false;
      this.getVueComponentName("eldialog", "visible", visibleVal.visible);
    },
    loadBasicUsage() {
      console.log("加载loadBasicUsage");
      var list = this.customcontent.infiniteListItem_basicUsage.list;
      var lastItem = list[list.length - 1];
      list.push({ id: lastItem.id + 1, label: lastItem.label + 1 });
    },
    loadDisable() {
      console.log("加载loadDisable");
      var scrollDisabledloading = getVueComponent(
        this,
        "$children",
        "$refs",
        "scrollLoadingTag"
      );
      var scrollDisableTag = getVueComponent(
        this,
        "$children",
        "$refs",
        "scrollDisableTag"
      );
      var list = this.customcontent.infiniteListItem_disableLoading.list;
      var lastItem = list[list.length - 1];
      if (list.length < 20) {
        scrollDisabledloading.style.visibility = "visible";
      }
      setTimeout(() => {
        if (list.length >= 20) {
          scrollDisableTag.style.visibility = "visible";
          scrollDisabledloading.style.visibility = "hidden";
        } else {
          list.push({ id: lastItem.id + 1, label: lastItem.label + 1 });
          list = [...new Set(list)];
          scrollDisableTag.style.visibility = "hidden";
        }
      }, 2000);
    },
    openDrawer() {
      this.getVueComponentName("elDrawerRef", "visible", true);
    },
    elDrawerBeforeClose() {
      this.getVueComponentName("elDrawerRef", "visible", false);
    },
    openTableDrawer() {
      this.getVueComponentName("elTableDrawerRef", "visible", true);
    },
    elDrawerTableBeforeClose() {
      this.getVueComponentName("elTableDrawerRef", "visible", false);
    },
    openNestedDrawer() {
      this.getVueComponentName("elNestedDrawerRef", "visible", true);
    },
    elNestedDrawerBeforeClose() {
      console.log("elNestedDrawerBeforeClose=====>");
      this.getVueComponentName("elNestedDrawerRef", "visible", false);
    },
    openInnerDrawer() {
      this.getVueComponentName("elInnerDrawerRef", "visible", true);
    },
    elInnerDrawerBeforeClose(type) {
      console.log("elInnerDrawerBeforeClose=====>");
      if (type !== "init") {
        this.getVueComponentName("elInnerDrawerRef", "visible", false);
      }
    },
    changeElTimelineBasicUsageVal(val) {
      this.getVueComponentName("elTimelineBasicUsage", "reverse", val);
    },
    visibleManualPopover() {
      // ElPopover 无法设置visible 只能设置value
      var manualPopoverVal = getVueComponent(
        this,
        "$children",
        "$refs",
        "manualPopoverRef"
      ).value;
      this.getVueComponentName("manualPopoverRef", "value", !manualPopoverVal);
    },
    closePopoverNestedOperation() {
      // ElPopover 无法设置visible 只能设置value
      console.log("关闭nestedOperationRef");
      this.getVueComponentName("nestedOperationRef", "value", false);
    },

    handleClickTableColumn() {
      console.log("click");
    },

    // elTreeType6
    getCheckedNodes() {
      var refComponent = getVueComponent(
        this,
        "$children",
        "$refs",
        "checkingTreeRef"
      );
      console.log(refComponent.getCheckedNodes());
    },
    getCheckedKeys() {
      var refComponent = getVueComponent(
        this,
        "$children",
        "$refs",
        "checkingTreeRef"
      );
      console.log(refComponent.getCheckedKeys());
    },
    setCheckedNodes() {
      var refComponent = getVueComponent(
        this,
        "$children",
        "$refs",
        "checkingTreeRef"
      );
      refComponent.setCheckedNodes([
        {
          id: 5,
          label: "Level two 2-1",
        },
        {
          id: 9,
          label: "Level three 1-1-1",
        },
      ]);
    },
    setCheckedKeys() {
      var refComponent = getVueComponent(
        this,
        "$children",
        "$refs",
        "checkingTreeRef"
      );
      refComponent.setCheckedKeys([3]);
    },
    resetChecked() {
      var refComponent = getVueComponent(
        this,
        "$children",
        "$refs",
        "checkingTreeRef"
      );
      refComponent.setCheckedKeys([]);
    },

    appendCustomNode(data) {
      console.log(data);
      let id = 100;
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    removeCustomNode(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },

    renderCustomNodeContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.appendCustomNode(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.removeCustomNode(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      );
    },
    renderContent(h, option) {
      return (
        <span>
          {option.key} - {option.label}
        </span>
      );
    },

    filterNodeMethod(value, data) {
      console.log("filterNodeMethod");
      console.log(value, data);
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    nodeDragStart(node, ev) {
      console.log("drag start", node);
    },
    nodeDragEnter(draggingNode, dropNode, ev) {
      console.log("tree drag enter: ", dropNode.label);
    },
    nodeDragLeave(draggingNode, dropNode, ev) {
      console.log("tree drag leave: ", dropNode.label);
    },
    nodeDragOver(draggingNode, dropNode, ev) {
      console.log("tree drag over: ", dropNode.label);
    },
    nodeDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("tree drag end: ", dropNode && dropNode.label, dropType);
    },
    nodeDrop(draggingNode, dropNode, dropType, ev) {
      console.log("tree drop: ", dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === "Level two 3-1") {
        return type !== "inner";
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf("Level three 3-1-1") === -1;
    },

    handleCloseDynamicTags(tag) {
      console.log("handleCloseDynamicTags");
      console.log(tag);
      if (tag) {
        this.customcontent.elDynamicallyTag.dynamicTags.splice(
          this.customcontent.elDynamicallyTag.dynamicTags.indexOf(tag),
          1
        );
      }
    },

    showInputDynamicTags() {
      this.customcontent.elDynamicallyTag.inputVisible = true;
      this.$nextTick((_) => {
        getVueComponent(
          this,
          "$children",
          "$refs",
          "saveTagInput"
        ).$refs.input.focus();
      });
    },

    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },

    handleInputConfirmDynamicTags() {
      let inputValue = this.customcontent.elDynamicallyTag.inputValue;
      if (inputValue) {
        this.customcontent.elDynamicallyTag.dynamicTags.push(inputValue);
      }
      this.customcontent.elDynamicallyTag.inputVisible = false;
      this.customcontent.elDynamicallyTag.inputValue = "";
    },

    deleteFixedHeaderAndColumn(e) {
      this.eltable.tableDataColumnHeader =
        this.eltable.tableDataColumnHeader.filter((v, index) => {
          console.log(index);
          return index !== e;
        });
      var refComponent = getVueComponent(
        this,
        "$children",
        "$refs",
        "fixedHeaderAndColumn"
      );
      refComponent.data = this.eltable.tableDataColumnHeader;
    },

    setCurrentSingleSelect(refName, item) {
      var refComponent = getVueComponent(this, "$children", "$refs", refName);
      refComponent.setCurrentRow(
        item.uniqueIdentifier == "tableData" ? this.eltable.tableData[1] : ""
      );
    },

    //multipleSelectRef
    toggleSelectionMultipleSelect(refName, item) {
      var refComponent = getVueComponent(this, "$children", "$refs", refName);
      console.log(refName, item);
      var rows =
        item.uniqueIdentifier == "tableData"
          ? [
              this.eltable.tableMultipleData[1],
              this.eltable.tableMultipleData[2],
            ]
          : [];
      console.log(rows);
      if (rows.length > 0) {
        rows.forEach((row) => {
          refComponent.toggleRowSelection(row);
        });
      } else {
        refComponent.clearSelection();
      }
    },

    formatterSorting(row, column) {
      return row.address;
    },

    resetDateFilter(refName) {
      var refComponent = getVueComponent(this, "$children", "$refs", refName);
      refComponent.clearFilter("date");
    },
    clearDateFilter(refName) {
      var refComponent = getVueComponent(this, "$children", "$refs", refName);
      refComponent.clearFilter();
    },
    formatterAddress(row, column) {
      return row.address;
    },
    filterTagHandler(value, row) {
      return row.tag === value;
    },
    filterDateHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },

    handleCustomColumnEdit(index, row) {
      console.log(index, row);
    },
    handleCustomColumnDelete(index, row) {
      console.log(index, row);
    },

    treeDataload(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: "2016-05-01",
            name: "wangxiaohu",
          },
          {
            id: 32,
            date: "2016-05-01",
            name: "wangxiaohu",
          },
        ]);
      }, 1000);
    },

    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      console.log("columns, data");
      console.log(columns, data);
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "Total Cost";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] =
            "$ " +
            values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
        } else {
          sums[index] = "N/A";
        }
      });

      return sums;
    },

    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },

    onSubmitInlineForm() {
      console.log("submit!");
    },

    submitValidationForm(refName) {
      var refComponent = getVueComponent(this, "$children", "$refs", refName);
      refComponent.validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    resetValidationForm(refName) {
      var refComponent = getVueComponent(this, "$children", "$refs", refName);
      refComponent.resetFields();
    },

    removeFormDynamicallyDomain(item) {
      var index = this.elform.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.elform.dynamicValidateForm.domains.splice(index, 1);
      }
    },

    addFormDynamicallyDomain() {
      console.log("addFormDynamicallyDomain");
      this.elform.dynamicValidateForm.domains.push({
        key: Date.now(),
        value: "",
      });

      console.log(this.elform.dynamicValidateForm.domains);
    },

    handleChangeCustomizable(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },

    handleCustomFileThumbnailRemove(file) {
      console.log(file);
    },
    handleCustomFileThumbnailPictureCardPreview(file) {
      console.log("handleCustomFileThumbnailPictureCardPreview");
      console.log(file);
      this.elupload.customFileThumbnailImageUrl = file.url;
      this.getVueComponentName("customFileThumbnail", "visible", true);
    },
    handleCustomFileThumbnailDownload(file) {
      console.log(file);
    },
    handleCustomFileThumbnailDialogClose() {
      this.getVueComponentName("customFileThumbnail", "visible", false);
    },

    handleFileListWithThumbnailRemove(file, fileList) {
      console.log(file, fileList);
    },

    handleFileListWithThumbnailPreview(file) {
      console.log(file);
    },

    handleFileListControlChange(file, fileList) {
      this.elupload.fileList = fileList.slice(-3);
    },

    submitManualUpload() {
      var manualUploadComponent = getVueComponent(
        this,
        "$children",
        "$refs",
        "manualUpload"
      );
      manualUploadComponent.submit();
    },

    formatTooltip(val) {
      return val / 100;
    },

    getVueComponentName(refName, paramsName, paramsVal) {
      console.log("getVueComponentName=====>");
      var refComponent = getVueComponent(this, "$children", "$refs", refName);
      console.log("refComponent==========>");
      console.log(refComponent);
      refComponent._events.changeValue[0](paramsName, paramsVal);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/element-ui.scss";
.el-form {
  display: flex;
  flex-direction: column;
}

::v-deep {
  .upload-demo {
    width: 368px;
  }
  .el-container {
    .el-form {
      height: auto !important;
    }
  }

  .el-table__fixed-body-wrapper {
    overflow-y: scroll;

    /*
      &::-webkit-scrollbar {
        width: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background: #99a9bf;
        border-radius: 20px;
      }
      */
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .el-table {
    width: 800px;
  }

  .el-tag {
    margin-right: 10px;
  }

  .el-progress {
    margin-bottom: 10px;
  }

  .el-tree {
    height: auto !important;
    padding: 15px 0;
    margin: 15px 0;
  }

  .skeleton {
    // ELSkeleton 一定要设置class为：skeleton
    .el-card__body {
      padding: 0 !important;
      .card-header {
        margin-top: 20px;
      }
    }
  }

  .skeletonList {
    width: 400px;
  }
  .descriptions-label {
    background: #e1f3d8;
  }

  .descriptions-content {
    background: #fde2e2;
  }

  .elDescriptionsSizes {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }

  .el-alert {
    margin-bottom: 10px;
  }

  .el-menu {
    margin-bottom: 15px;
  }

  .elRadioTab {
    margin-bottom: 30px;
  }
  .elTabPosition {
    height: 200px;
  }
  .triggerType {
    display: flex;
  }
  .triggerDetail {
    display: flex;
    flex-direction: column;
  }
  .el-dropdown {
    margin-right: 15px;
  }
  .elStepsVerticalStep {
    height: 300px;
  }

  .elInnerDialogClass {
    .el-dialog__body {
      width: 200px;
      height: 200px;
    }
  }
  .el-popover__reference {
    margin-right: 20px;
  }
  .popoverNestedOperationContent {
    text-align: right;
    margin: 0;
  }
  .elCardShadowRow {
    .el-card {
      width: auto !important;
    }
  }
  .el-collapse,
  .el-carousel,
  .el-card {
    margin: 30px 0;
  }

  .el-timeline {
    margin-top: 30px;
  }
  .is-selected {
    color: #1989fa;
  }

  .el-button--text {
    margin: 0 15px;
  }
  .el-drawer__body {
    .el-table,
    .el-table__body,
    .el-table__fixed,
    .el-table__header {
      width: 100% !important;
    }
  }
  .infinite-list {
    width: 500px;
    height: 300px;
    padding: 0;
    margin: 0;
    list-style: none;
    .infinite-list-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      background: #e8f3fe;
      margin: 10px;
      color: #7dbcfc;
    }
  }

  .infinite-list:last-child {
    margin-top: 45px;
    .infinite-list-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      background: #fff6f6;
      color: #ff8484;
    }
  }

  .el-collapse {
    width: 500px;
    .el-collapse-item__header,
    .el-collapse-item__content {
      padding: 0 15px;
    }
  }
  .el-carousel {
    width: 500px;

    .el-carousel__item {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
      text-align: center;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }

  .skeleton {
    .el-card {
      width: 400px;
    }
  }
  .el-card {
    width: 500px;
    .el-button {
      float: right;
      padding: 3px 0;
    }
  }
  .el-dialog {
    top: 20%;
    width: 50% !important;
    height: 50% !important;
    .el-dialog__body {
      height: 28%;
    }
  }
  .el-steps {
    width: 500px;
  }
  .el-tabs--border-card {
    margin-top: 15px;
  }
  .el-menu-vertical-demo {
    margin-top: 15px;
  }
  .el-link--inner {
    span {
      width: auto !important;
      height: auto !important;
      overflow: auto !important;
      height: auto !important;
    }
  }
  .el-menu {
    width: 100%;
  }
  .el-menu-item,
  .el-submenu {
    span {
      width: auto !important;
      height: auto !important;
      overflow: auto !important;
      color: #909399 !important;
      visibility: initial !important;
    }
  }
  .el-alert {
    width: 500px;
    padding: 8px 16px;
  }
  .is-dark {
    margin-top: 20px;
  }
  .el-result {
    float: left;
    margin-right: 30px;
  }
  .el-badge {
    margin-right: 30px;
  }
  .el-progress {
    width: auto;
    margin-top: 12px;
    margin-right: 15px;
  }
  .el-progress--dashboard {
    width: 126px !important;
  }
  .demo-ruleForm {
    height: 62vh !important;
    .el-form-item {
      margin-top: 30px;
    }
    .el-date-editor--time {
      margin-left: 20px;
    }
  }
  .el-form-item {
    display: flex;
  }

  .el-form-item__content {
    line-height: 1 !important;
  }

  .el-slider {
    width: 500px;
    margin-left: 20px;
  }
  .el-date-editor--time-select {
    margin-left: 20px;
  }
  .upload-demo {
    float: left;
  }

  .el-upload {
    display: table;
    margin: 30px 0;
  }

  .upload-demo {
    margin: 30px 0;
    .el-upload {
      margin: 0;
    }
  }

  .avatar-uploader {
    float: left;
    margin-left: 30px;
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }

  .el-avatar {
    display: inline-block;
    box-sizing: border-box;
    text-align: center;
    overflow: hidden;
    color: #fff;
    background: #c0c4cc !important;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }

  .el-avatar--circle:last-child {
    margin-left: 15px;
  }

  .el-avatar--square {
    margin-left: 15px;
  }

  .el-card__body {
    .image {
      width: 500px;
      height: 267px;
    }
    .skeletonCardCtn {
      padding: 14px;
    }
  }

  //.skeletonContainer {
  flex-direction: column;
  .skeleton {
    margin-top: 30px;
    .el-skeleton {
      width: 240px;
      margin-top: 30px;
      .skeletonItemImage {
        width: 400px;
        height: 267px;
      }
      .skeletonttemList {
        padding: 14px;
        .skeletonItemh3 {
          width: 50%;
        }
        .skeletonItemTextList {
          display: flex;
          align-items: center;
          justify-items: space-between;
          margin-top: 16px;
          height: 16px;

          .skeletonItemRight-1 {
            margin-right: 16px;
          }
          .skeletonItemRight-2 {
            width: 30%;
          }
        }
      }
    }
    .el-card__body {
      .image {
        width: 400px;
        height: 267px;
      }
      .skeletonCardCtn {
        padding: 14px;
      }
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  //}

  .el-descriptions {
    padding: 20px;
    background-color: #fff;
  }
}
</style>