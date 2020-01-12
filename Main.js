

    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Events = Matter.Events,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600,
       //     background:("white"),
            showAngleIndicator: true
        
        }
    })
    // fit the render viewport to the scene
    Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
    })

    World.add(world, mouseConstraint);
    
    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // add bodies
    
    groundOptions={
        isStatic:true,
    //    fill:("red")
    }  
        
    var ground1 = Bodies.rectangle(400, 590, 800, 20, groundOptions );
    var pyramid1 = Composites.pyramid(400, 300, 11, 8, 2, 2, function(x, y) {
        return Bodies.rectangle(x, y, 20, 40);
    })

    var ground2 = Bodies.rectangle(500, 275, 250, 20, groundOptions);
    var pyramid2 = Composites.pyramid(420, 0, 12, 10, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, 15, 30);
    });

    groundIOptions={
        isStatic:true,
        fill:("red")
    }  
    var ground3 = Bodies.rectangle(675, 350, 200, 20, groundIOptions);
    
    
    rockOptions = { density: 0.1 },
        rock = Bodies.polygon(170, 450, 6, 15, rockOptions),
        anchor = { x: 170, y: 450 },
        elastic = Constraint.create({ 
            pointA: anchor, 
            bodyB: rock, 
            stiffness: .03
        })

    World.add(engine.world, [ground1, pyramid1, ground2,ground3, pyramid2, rock, elastic]);

    Events.on(engine, 'afterUpdate', function() {
        if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430)) {
            rock = Bodies.polygon(170, 450, 5, 15, rockOptions);
            World.add(engine.world, rock);
            elastic.bodyB = rock;
        }
    })
      

    

    // context for MatterTools.Demo
  /*  return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
*/

if (typeof module !== 'undefined') {
    module.exports = Example[Object.keys(Example)[0]];
}