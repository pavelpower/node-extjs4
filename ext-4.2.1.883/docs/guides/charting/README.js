Ext.data.JsonP.charting({"title":"Charting","guide":"<h1>Charting</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/charting-section-1'>Chart class</a></li>\n<li><a href='#!/guide/charting-section-2'>Legend</a></li>\n<li><a href='#!/guide/charting-section-3'>Theming</a></li>\n<li><a href='#!/guide/charting-section-4'>Series</a></li>\n<li><a href='#!/guide/charting-section-5'>Area</a></li>\n<li><a href='#!/guide/charting-section-6'>Bar</a></li>\n<li><a href='#!/guide/charting-section-7'>Line</a></li>\n<li><a href='#!/guide/charting-section-8'>Pie</a></li>\n<li><a href='#!/guide/charting-section-9'>Radar</a></li>\n<li><a href='#!/guide/charting-section-10'>Scatter</a></li>\n<li><a href='#!/guide/charting-section-11'>Gauge</a></li>\n</ol>\n</div>\n\n<p>The chart package uses the surfaces and sprites developed with\n<a href=\"#!/guide/drawing\">the drawing package</a>\nto create versatile graphics\nthat run on virtually any browser or device.</p>\n\n<p>The chart package consists of\na hierarchy of classes that define a chart container\n(something like a surface but more specific for handling charts);\naxes, legends, series, labels, callouts, tips,\ncartesian and radial coordinates,\nand specific series like Pie, Area, and Bar.</p>\n\n<p>In this guide, we discuss</p>\n\n<ul>\n<li>how these classes are tied together</li>\n<li>what bits of functionality go into each of these classes</li>\n<li>how to apply themes to a chart</li>\n<li>how to use specific series such as Pie, Area, and Bar</li>\n</ul>\n\n\n<h2 id='charting-section-1'>Chart class</h2>\n\n<p>The Chart class is the main drawing surface for series.\nIt manages the rendering of each series\nand also how axes are drawn and defined.\nChart also delegates mouse events over\nto different areas of the Chart like Series, Axes, etc.\nThe Chart class extends Draw Component.</p>\n\n<p>A Chart instance has access to:</p>\n\n<ul>\n<li>axes - Standard Cartesian charts using the x,y scheme\nand accessed through <code>chart.axes</code>.\nAll the axes being defined and drawn for this visualization.\nThis is a mixed collection.</li>\n<li>series - Accessed through <code>chart.series</code>.\nAll the series being drawn for the chart.\nThis could be line, bar, scatter, etc. This is also a mixed collection.</li>\n<li>legend - The legend box object and its legend items.</li>\n</ul>\n\n\n<p>The chart instance supports custom events\nthat can be triggered right before and during\nthe rendering of the visualization.\nWe can add handlers for these events by using:</p>\n\n<pre><code>chart.on({\n  'refresh': function() {\n    alert('(re)drawing the chart');\n  }\n});\n</code></pre>\n\n<p>Chart also delegates events like <code>itemmousedown</code> and <code>itemmouseup</code>\nto the series so that we can append listeners\nto those objects and get the target sprite of the event.</p>\n\n<h2 id='charting-section-2'>Legend</h2>\n\n<p>The chart configuration object accepts a <code>legend</code> parameter\nto enable legend items for each series\nand to set the position of the legend.\nThese options are passed into the constructor of the chart. For example:</p>\n\n<pre><code>var chart = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('<a href=\"#!/api/Ext.chart.Chart\" rel=\"Ext.chart.Chart\" class=\"docClass\">Ext.chart.Chart</a>', {\n    width: 200,\n    height: 200,\n\n    // Set a legend\n    legend: {\n        position: 'left'\n    },\n\n    // Define axes\n    axes: [/*set an axis configuration*/],\n\n    // Define series\n    series: [/*set series configuration*/]\n});\n</code></pre>\n\n<p>Each series object needs to have the <code>showInLegend</code> parameter\nset to <code>true</code> in order to be in the legend list.</p>\n\n<h3>Axis</h3>\n\n<p>The <code>axis</code> package contains an <code>Abstract</code> axis class\nthat is extended by <code>Axis</code> and <code>Radial</code> axes.\n<code>Axis</code> represents a <code>Cartesian</code> axis\nand <code>Radial</code> uses polar coordinates\nto represent the information for polar based visualizations\nlike Pie and Radar series.\nAxes are bound to the type of data we're trying to represent.\nThere are axes for categorical information (called <code>Category</code> axis)\nand also axes for quantitative information like <code>Numeric</code>.\nFor time-based information we have the <code>Time</code> axis\nthat enables us to render information over a specific period of time,\nand to update that period of time with smooth animations.\nIf you'd like to know more about each axis\nplease go to the axis package documentation.\nAlso, you will find configuration examples for axis\nin the bottom series examples.</p>\n\n<p>An axis contains divisions and subdivisions of values,\nrepresented by major and minor ticks.\nThese can be adjusted automatically or manually\nto some specified interval, maximum and minimum values.\nThe configuration options <code>maximum</code>, <code>minimum</code>,\n<code>majorTickSteps</code> and <code>minorTickSteps</code> in the <code>Numeric</code> axis\nare used to change the configuration and placement of the major and minor ticks.\nFor example, by using:</p>\n\n<pre><code>        axes: [{\n            type: 'Numeric',\n            position: 'left',\n            fields: ['data1'],\n            title: 'Number of Hits',\n            minimum: 0,\n            //one minor tick between two major ticks\n            minorTickSteps: 1\n        }, {\n            type: 'Category',\n            position: 'bottom',\n            fields: ['name'],\n            title: 'Month of the Year'\n        }]\n</code></pre>\n\n<p>The following configuration produces minor ticks in the left axis\nfor the line series:</p>\n\n<p><p><img src=\"guides/charting/Ticks.jpg\" alt=\"Series Image\"></p></p>\n\n<h3>Gradients</h3>\n\n<p>The drawing and charting package\nhas also the power to create linear gradients.\nThe gradients can be defined in the Chart configuration object\nas an array of gradient configurations.\nFor each gradient configuration\nthe following parameters are specified:</p>\n\n<ul>\n<li><strong>id</strong> - string - The unique name of the gradient.</li>\n<li><strong>angle</strong> - number, optional - The angle of the gradient in degrees.</li>\n<li><strong>stops</strong> - object - An object with numbers as keys\n(from 0 to 100) and style objects as values.</li>\n</ul>\n\n\n<p>Each key in the stops object represents\nthe percentage of the fill on the specified color for the gradient.</p>\n\n<p>For example:</p>\n\n<pre><code>    gradients: [{\n        id: 'gradientId',\n        angle: 45,\n        stops: {\n            0: {\n                color: '#555'\n            },\n            100: {\n                color: '#ddd'\n            }\n        }\n    },  {\n        id: 'gradientId2',\n        angle: 0,\n        stops: {\n            0: {\n                color: '#590'\n            },\n            20: {\n                color: '#599'\n            },\n            100: {\n                color: '#ddd'\n            }\n        }\n    }]\n</code></pre>\n\n<p>You can apply a gradient to a sprite\nby setting a reference to a gradient <strong>id</strong> in the fill property.\nThis reference is done via a url syntax. For example:</p>\n\n<pre><code>    sprite.setAttributes({\n        fill: 'url(#gradientId)'\n    }, true);\n</code></pre>\n\n<h3>Series</h3>\n\n<p>A <code>Series</code> is an abstract class\nextended by concrete visualizations\nlike <code>Line</code> or <code>Scatter</code>:</p>\n\n<ul>\n<li>The <code>Series</code> class contains code that is common to all of these series,\nsuch as event handling, animation handling, shadows,\ngradients, and common offsets.</li>\n<li>The <code>Series</code> class is enhanced with a set of <em>mixins</em>\nthat provide functionality such as highlighting, callouts, and tips.</li>\n<li>A <code>Series</code> contains an array of <code>items</code>\nwhere each item contains information about\nthe positioning of each element,\nits associated <code>sprite</code> and a <code>storeItem</code>.</li>\n<li>A <code>Series</code> also shares the <code>drawSeries</code> method\nthat updates all positions for the series and then renders the series.</li>\n</ul>\n\n\n<h2 id='charting-section-3'>Theming</h2>\n\n<p>The Chart configuration object may have a <code>theme</code> property\nwith a string value that references a builtin theme name.</p>\n\n<pre><code>var chart = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('<a href=\"#!/api/Ext.chart.Chart\" rel=\"Ext.chart.Chart\" class=\"docClass\">Ext.chart.Chart</a>', {\n    theme: 'Blue',\n    /* Other options... */\n});\n</code></pre>\n\n<p><strong>Note:</strong> Charting is implemented with the surfaces and sprites\ndefined by the graphics libraries\nand created with the drawing package.\nIt does not use CSS and so theming is done\nusing its own theming implementation,\nnot the Ext JS 4.2 theming package implementation.</p>\n\n<p>A Theme defines the style of the shapes, color, font,\naxes and background of a chart.\nThe theming configuration can be very rich and complex:</p>\n\n<pre><code>{\n    axis: {\n        fill: '#000',\n        'stroke-width': 1\n    },\n    axisLabelTop: {\n        fill: '#000',\n        font: '11px Arial'\n    },\n    axisLabelLeft: {\n        fill: '#000',\n        font: '11px Arial'\n    },\n    axisLabelRight: {\n        fill: '#000',\n        font: '11px Arial'\n    },\n    axisLabelBottom: {\n        fill: '#000',\n        font: '11px Arial'\n    },\n    axisTitleTop: {\n        fill: '#000',\n        font: '11px Arial'\n    },\n    axisTitleLeft: {\n        fill: '#000',\n        font: '11px Arial'\n    },\n    axisTitleRight: {\n        fill: '#000',\n        font: '11px Arial'\n    },\n    axisTitleBottom: {\n        fill: '#000',\n        font: '11px Arial'\n    },\n    series: {\n        'stroke-width': 1\n    },\n    seriesLabel: {\n        font: '12px Arial',\n        fill: '#333'\n    },\n    marker: {\n        stroke: '#555',\n        fill: '#000',\n        radius: 3,\n        size: 3\n    },\n    seriesThemes: [{\n        fill: '#C6DBEF'\n    }, {\n        fill: '#9ECAE1'\n    }, {\n        fill: '#6BAED6'\n    }, {\n        fill: '#4292C6'\n    }, {\n        fill: '#2171B5'\n    }, {\n        fill: '#084594'\n    }],\n    markerThemes: [{\n        fill: '#084594',\n        type: 'circle'\n    }, {\n        fill: '#2171B5',\n        type: 'cross'\n    }, {\n        fill: '#4292C6',\n        type: 'plus'\n    }]\n}\n</code></pre>\n\n<p>We can also create a seed of colors\nthat is a base for the entire theme\njust by creating a simple array of colors\nin the configuration object like:</p>\n\n<pre><code>{\n  colors: ['#aaa', '#bcd', '#eee']\n}\n</code></pre>\n\n<p>When setting a base color, the theme generates\nan array of colors that match the base color:</p>\n\n<pre><code>{\n  baseColor: '#bce'\n}\n</code></pre>\n\n<p>You can create a custom theme by extending from the base theme.\nFor example, to create a custom <code>Fancy</code> theme we can do:</p>\n\n<pre><code>var colors = ['#555',\n              '#666',\n              '#777',\n              '#888',\n              '#999'];\n\nvar baseColor = '#eee';\n\n<a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('Ext.chart.theme.Fancy', {\n    extend: '<a href=\"#!/api/Ext.chart.theme.Base\" rel=\"Ext.chart.theme.Base\" class=\"docClass\">Ext.chart.theme.Base</a>',\n\n    constructor: function(config) {\n        this.callParent([<a href=\"#!/api/Ext-method-apply\" rel=\"Ext-method-apply\" class=\"docClass\">Ext.apply</a>({\n            axis: {\n                fill: baseColor,\n                stroke: baseColor\n            },\n            axisLabelLeft: {\n                fill: baseColor\n            },\n            axisLabelBottom: {\n                fill: baseColor\n            },\n            axisTitleLeft: {\n                fill: baseColor\n            },\n            axisTitleBottom: {\n                fill: baseColor\n            },\n            colors: colors\n        }, config)]);\n    }\n});\n\nvar chart = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('<a href=\"#!/api/Ext.chart.Chart\" rel=\"Ext.chart.Chart\" class=\"docClass\">Ext.chart.Chart</a>', {\n    theme: 'Fancy',\n\n    /* Other options here... */\n});\n</code></pre>\n\n<h2 id='charting-section-4'>Series</h2>\n\n<p>The following section will go through our available series/visualizations,\nintroduces each of the series and visualizations\nthat are included in Ext JS\nand shows a complete configuration example of the series.\nThe example includes the <code>Chart</code>,\n<code>Axis</code> and <code>Series</code> configuration options.</p>\n\n<h2 id='charting-section-5'>Area</h2>\n\n<p>Creates a Stacked Area Chart.\nThe stacked area chart is useful\nwhen displaying multiple aggregated layers of information.\nAs with all other series,\nthe Area Series must be appended in the <em>series</em> Chart array configuration.</p>\n\n<p><p><img src=\"guides/charting/Area.jpg\" alt=\"Series Image\"></p></p>\n\n<p>A typical configuration object for the area series could be:</p>\n\n<pre><code>var chart = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('<a href=\"#!/api/Ext.chart.Chart\" rel=\"Ext.chart.Chart\" class=\"docClass\">Ext.chart.Chart</a>', {\n    renderTo: <a href=\"#!/api/Ext-method-getBody\" rel=\"Ext-method-getBody\" class=\"docClass\">Ext.getBody</a>(),\n    width: 800,\n    height: 600,\n    animate: true,\n    store: store,\n    legend: {\n        position: 'bottom'\n    },\n\n    // Add Numeric and Category axis\n    axes: [{\n        type: 'Numeric',\n        position: 'left',\n        fields: ['data1', 'data2', 'data3'],\n        title: 'Number of Hits',\n        grid: {\n            odd: {\n                opacity: 1,\n                fill: '#ddd',\n                stroke: '#bbb',\n                'stroke-width': 1\n            }\n        },\n        minimum: 0,\n        adjustMinimumByMajorUnit: 0\n    }, {\n        type: 'Category',\n        position: 'bottom',\n        fields: ['name'],\n        title: 'Month of the Year',\n        grid: true,\n        label: {\n            rotate: {\n                degrees: 315\n            }\n        }\n    }],\n\n    // Add the Area Series\n    series: [{\n        type: 'area',\n        highlight: true,\n        axis: 'left',\n        xField: 'name',\n        yField: ['data1', 'data2', 'data3'],\n        style: {\n            opacity: 0.93\n        }\n    }]\n});\n</code></pre>\n\n<h2 id='charting-section-6'>Bar</h2>\n\n<p>Creates a Bar Chart.\nA Bar Chart is a useful visualization technique\nto display quantitative information for different categories\nthat can show some progression (or regression) in the dataset.\nAs with all other series,\nthe Bar Series must be appended in the <em>series</em> Chart array configuration.\nSee the Chart documentation for more information.</p>\n\n<p><p><img src=\"guides/charting/Bar.jpg\" alt=\"Series Image\"></p></p>\n\n<p>A typical configuration object for the bar series could be:</p>\n\n<pre><code>var chart = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('<a href=\"#!/api/Ext.chart.Chart\" rel=\"Ext.chart.Chart\" class=\"docClass\">Ext.chart.Chart</a>', {\n    renderTo: <a href=\"#!/api/Ext-method-getBody\" rel=\"Ext-method-getBody\" class=\"docClass\">Ext.getBody</a>(),\n    width: 800,\n    height: 600,\n    animate: true,\n    store: store,\n    theme: 'White',\n    axes: [{\n        type: 'Numeric',\n        position: 'bottom',\n        fields: ['data1'],\n        title: 'Number of Hits'\n    }, {\n        type: 'Category',\n        position: 'left',\n        fields: ['name'],\n        title: 'Month of the Year'\n    }],\n    //Add Bar series.\n    series: [{\n        type: 'bar',\n        axis: 'bottom',\n        xField: 'name',\n        yField: 'data1',\n        highlight: true,\n        label: {\n            display: 'insideEnd',\n            field: 'data1',\n            renderer: <a href=\"#!/api/Ext.util.Format-method-numberRenderer\" rel=\"Ext.util.Format-method-numberRenderer\" class=\"docClass\">Ext.util.Format.numberRenderer</a>('0'),\n            orientation: 'horizontal',\n            color: '#333',\n           'text-anchor': 'middle'\n        }\n    }]\n});\n</code></pre>\n\n<h2 id='charting-section-7'>Line</h2>\n\n<p>Creates a Line Chart.\nA Line Chart is a useful visualization technique\nto display quantitative information for different categories\nor other real values (as opposed to the bar chart),\nthat can show some progression (or regression) in the dataset.\nAs with all other series,\nthe Line Series must be appended\nin the <em>series</em> Chart array configuration.\nSee the Chart documentation for more information.</p>\n\n<p><p><img src=\"guides/charting/Line.jpg\" alt=\"Series Image\"></p></p>\n\n<p>A typical configuration object for the line series could be:</p>\n\n<pre><code>var chart = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('<a href=\"#!/api/Ext.chart.Chart\" rel=\"Ext.chart.Chart\" class=\"docClass\">Ext.chart.Chart</a>', {\n    renderTo: <a href=\"#!/api/Ext-method-getBody\" rel=\"Ext-method-getBody\" class=\"docClass\">Ext.getBody</a>(),\n    width: 800,\n    height: 600,\n    animate: true,\n    store: store,\n    shadow: true,\n    theme: 'Category1',\n    axes: [{\n        type: 'Numeric',\n        minimum: 0,\n        position: 'left',\n        fields: ['data1', 'data2', 'data3'],\n        title: 'Number of Hits'\n    }, {\n        type: 'Category',\n        position: 'bottom',\n        fields: ['name'],\n        title: 'Month of the Year'\n    }],\n\n    // Add two line series\n    series: [{\n        type: 'line',\n        axis: 'left',\n        xField: 'name',\n        yField: 'data1',\n        markerConfig: {\n            type: 'cross',\n            size: 4,\n            radius: 4,\n            'stroke-width': 0\n        }\n    }, {\n        type: 'line',\n        axis: 'left',\n        fill: true,\n        xField: 'name',\n        yField: 'data3',\n        markerConfig: {\n            type: 'circle',\n            size: 4,\n            radius: 4,\n            'stroke-width': 0\n        }\n    }]\n});\n</code></pre>\n\n<p>A marker configuration object\ncontains the same properties used to create a Sprite.\nYou can find the properties\nused to create a Sprite in the Sprite section of the\n<a href=\"#!/guide/drawing\">Drawing</a> guide.</p>\n\n<h2 id='charting-section-8'>Pie</h2>\n\n<p>Creates a Pie Chart.\nA Pie Chart is a useful visualization technique\nto display quantitative information for different categories\nthat also have a meaning as a whole.\nAs with all other series,\nthe Pie Series must be appended\nin the <em>series</em> Chart array configuration.\nSee the Chart documentation for more information.\nA typical configuration object for the pie series could be:</p>\n\n<p><p><img src=\"guides/charting/Pie.jpg\" alt=\"Series Image\"></p></p>\n\n<p>A typical configuration object for the pie series could be:</p>\n\n<pre><code>var chart = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('<a href=\"#!/api/Ext.chart.Chart\" rel=\"Ext.chart.Chart\" class=\"docClass\">Ext.chart.Chart</a>', {\n    width: 800,\n    height: 600,\n    animate: true,\n    shadow: true,\n    store: store,\n    renderTo: <a href=\"#!/api/Ext-method-getBody\" rel=\"Ext-method-getBody\" class=\"docClass\">Ext.getBody</a>(),\n    legend: {\n        position: 'right'\n    },\n    insetPadding: 25,\n    theme: 'Base:gradients',\n    series: [{\n        type: 'pie',\n        field: 'data1',\n        showInLegend: true,\n        highlight: {\n          segment: {\n            margin: 20\n          }\n        },\n        label: {\n            field: 'name',\n            display: 'rotate',\n            contrast: true,\n            font: '18px Arial'\n        }\n    }]\n});\n</code></pre>\n\n<h2 id='charting-section-9'>Radar</h2>\n\n<p>Creates a Radar Chart.\nA Radar Chart is a useful visualization technique\nfor comparing different quantitative values\nfor a constrained number of categories.\nAs with all other series,\nthe Radar series must be appended\nin the <em>series</em> Chart array configuration.\nSee the Chart documentation for more information.</p>\n\n<p><p><img src=\"guides/charting/Radar.jpg\" alt=\"Series Image\"></p></p>\n\n<p>A typical configuration object for the radar series could be:</p>\n\n<pre><code>var chart = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('<a href=\"#!/api/Ext.chart.Chart\" rel=\"Ext.chart.Chart\" class=\"docClass\">Ext.chart.Chart</a>', {\n    width: 800,\n    height: 600,\n    animate: true,\n    store: store,\n    renderTo: <a href=\"#!/api/Ext-method-getBody\" rel=\"Ext-method-getBody\" class=\"docClass\">Ext.getBody</a>(),\n    insetPadding: 20,\n    theme: 'Category2',\n    axes: [{\n        type: 'Radial',\n        position: 'radial',\n        label: {\n            display: true\n        }\n    }],\n\n    // Add two series for radar.\n    series: [{\n        type: 'radar',\n        xField: 'name',\n        yField: 'data1',\n        showMarkers: true,\n        markerConfig: {\n            radius: 5,\n            size: 5\n        },\n        style: {\n            'stroke-width': 2,\n            fill: 'none'\n        }\n    },{\n        type: 'radar',\n        xField: 'name',\n        yField: 'data3',\n        showMarkers: true,\n        markerConfig: {\n            radius: 5,\n            size: 5\n        },\n        style: {\n            'stroke-width': 2,\n            fill: 'none'\n        }\n    }]\n});\n</code></pre>\n\n<h2 id='charting-section-10'>Scatter</h2>\n\n<p>Creates a Scatter Chart.\nThe scatter plot is useful\nwhen trying to display more than two variables in the same visualization.\nThese variables can be mapped into x, y coordinates\nand also to an element's radius/size, color, etc.\nAs with all other series,\nthe Scatter Series must be appended\nin the <em>series</em> Chart array configuration.\nSee the Chart documentation for more information on creating charts.</p>\n\n<p><p><img src=\"guides/charting/Scatter.jpg\" alt=\"Series Image\"></p></p>\n\n<p>A typical configuration object for the scatter series could be:</p>\n\n<pre><code>var chart = <a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('<a href=\"#!/api/Ext.chart.Chart\" rel=\"Ext.chart.Chart\" class=\"docClass\">Ext.chart.Chart</a>', {\n    width: 800,\n    height: 600,\n    animate: true,\n    store: store,\n    renderTo: <a href=\"#!/api/Ext-method-getBody\" rel=\"Ext-method-getBody\" class=\"docClass\">Ext.getBody</a>(),\n    axes: [{\n        type: 'Numeric',\n        position: 'left',\n        fields: ['data1', 'data2', 'data3'],\n        title: 'Number of Hits'\n    }],\n    series: [{\n        type: 'scatter',\n        markerConfig: {\n            radius: 5,\n            size: 5\n        },\n        axis: 'left',\n        xField: 'name',\n        yField: 'data1',\n        color: '#a00'\n    }, {\n        type: 'scatter',\n        markerConfig: {\n            radius: 5,\n            size: 5\n        },\n        axis: 'left',\n        xField: 'name',\n        yField: 'data2'\n    }, {\n        type: 'scatter',\n        markerConfig: {\n            radius: 5,\n            size: 5\n        },\n        axis: 'left',\n        xField: 'name',\n        yField: 'data3'\n    }]\n});\n</code></pre>\n\n<h2 id='charting-section-11'>Gauge</h2>\n\n<p>Creates a Gauge Chart.\nGauge Charts are used to show progress in a certain variable.\nA Gauge chart can be used\nto set a store element into the Gauge\nand select the field to be used from that store;\nor it can be used to instantiate the visualization,\nusing the <code>setValue</code> method to adjust the value you want.</p>\n\n<p><p><img src=\"guides/charting/Gauge.jpg\" alt=\"Series Image\"></p></p>\n\n<p>A chart/series configuration\nfor the Gauge visualization could look like this:</p>\n\n<pre><code>{\n    xtype: 'chart',\n    store: store,\n    axes: [{\n        type: 'gauge',\n        position: 'gauge',\n        minimum: 0,\n        maximum: 100,\n        steps: 10,\n        margin: -10\n    }],\n    series: [{\n        type: 'gauge',\n        field: 'data1',\n        donut: false,\n        colorSet: ['#F49D10', '#ddd']\n    }]\n}\n</code></pre>\n\n<p>In this configuration we create a special Gauge axis\nto be used with the gauge visualization (describing half-circle markers),\nand also we're setting a maximum, minimum\nand steps configuration options into the axis.\nThe Gauge series configuration contains the store field\nto be bound to the visual display.\nand the color set to be used with the visualization.</p>\n"});